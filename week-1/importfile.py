# --- File: main.py, in the same folder ---
import filetoimport
efficiency = filetoimport.calculate_efficiency(450, 36)
print(f"{efficiency:.2f} km/L")
print(filetoimport.classify_mileage(172000))
# Alternative import style
from filetoimport import classify_mileage
print(classify_mileage(30000))