# backend_api.py
import base64
import io
import time
import numpy as np
from PIL import Image, ImageOps
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from pyngrok import ngrok

# --- Mock imports for FloodEYE model ---
# from floodeye_model import load_model, predict_mask
# model = load_model("path/to/weights.pth")

app = FastAPI(title="FloodEYE API", description="Backend wrapper for Space and Aqua Dashboard")

# Allow all CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class FloodRequest(BaseModel):
    image_base64: str
    bounds: dict = None

class Metrics(BaseModel):
    total_area_sqkm: float
    flooded_area_sqkm: float
    severity_index: float

class FloodResponse(BaseModel):
    mask_image_base64: str
    metrics: Metrics

def process_image(img: Image.Image):
    """
    Mock integration for the FloodEYE model inference.
    Replace this with actual tensorial preprocessing and `model.predict()`.
    Currently, it creates a fake neon-aqua mask based on brightness thresholds.
    """
    try:
        # Convert to grayscale to simulate radar/water detection
        gray = img.convert("L")
        np_img = np.array(gray)
        
        # Fake logic: darker areas = water
        water_mask = (np_img < 80).astype(np.uint8) * 255
        
        # Colorize to match the "Space and Aqua" aesthetic (#66FCF1)
        mask_rgba = np.zeros((np_img.shape[0], np_img.shape[1], 4), dtype=np.uint8)
        mask_rgba[water_mask == 255] = [102, 252, 241, 150] # Neon aqua with some transparency
        
        mask_img = Image.fromarray(mask_rgba, 'RGBA')
        
        # Calculate fake metrics based on pixels
        total_pixels = mask_rgba.shape[0] * mask_rgba.shape[1]
        water_pixels = np.count_nonzero(water_mask)
        severity = (water_pixels / total_pixels) * 100 if total_pixels > 0 else 0
        
        # Convert output mask back to base64
        buffered = io.BytesIO()
        mask_img.save(buffered, format="PNG")
        mask_b64 = base64.b64encode(buffered.getvalue()).decode("utf-8")
        
        return mask_b64, severity
        
    except Exception as e:
        raise RuntimeError(f"Model Inference Failed: {str(e)}")


@app.post("/analyze", response_model=FloodResponse)
async def analyze_flood(payload: FloodRequest):
    try:
        # 1. Decode incoming base64 image
        if payload.image_base64.startswith("data:image"):
            base64_data = payload.image_base64.split(",")[1]
        else:
            base64_data = payload.image_base64

        image_bytes = base64.b64decode(base64_data)
        img = Image.open(io.BytesIO(image_bytes))

        # Optionally log bounds if provided
        if payload.bounds:
            print(f"Processing analysis region: {payload.bounds}")

        # 2. Run inference (wrapped in try/except)
        # Simulate processing delay
        time.sleep(1.5) 
        mask_b64, severity = process_image(img)

        # 3. Format and return Real, dynamically calculated data fields
        # (Assuming 1 pixel ~ 10m x 10m for a standard Sentinel-1 tile, but faking scale here)
        # We can dynamically calculate fake total area based on bounds if they exist
        total_area = 1250.5 
        if payload.bounds and 'min_lon' in payload.bounds:
             # simple mock area calculation based on degrees of difference
             lon_diff = payload.bounds['max_lon'] - payload.bounds['min_lon']
             lat_diff = payload.bounds['max_lat'] - payload.bounds['min_lat']
             total_area = (lon_diff * 111) * (lat_diff * 111) # roughly 111km per degree
             
        flooded_area = total_area * (severity / 100)
        
        return FloodResponse(
            mask_image_base64=f"data:image/png;base64,{mask_b64}",
            metrics=Metrics(
                total_area_sqkm=round(total_area, 2),
                flooded_area_sqkm=round(flooded_area, 2),
                severity_index=round(severity, 2)
            )
        )

    except Exception as e:
        # Return strict HTTP 500 error codes to the frontend
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import nest_asyncio
    nest_asyncio.apply()
    
    # Expose the API publicly using ngrok
    # print("Starting Ngrok Tunnel...")
    # NOTE: Set your authtoken if required: ngrok.set_auth_token("YOUR_TOKEN")
    # public_url = ngrok.connect(8000).public_url
    # print(f"\\n🔥 FastAPI securely exposed at: {public_url}\\n")
    print("Backend API running at http://localhost:8000\\n")

    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
