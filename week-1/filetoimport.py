# --- File: vehicle_utils.py ---
def calculate_efficiency    (distance_km, fuel_liters):
    return distance_km / fuel_liters
def classify_mileage(km):
    if km < 50000:
        return "Low mileage"
    elif km < 150000:
        return "Moderate mileage"
    else:
        return "High mileage"