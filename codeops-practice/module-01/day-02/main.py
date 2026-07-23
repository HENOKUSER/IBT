payment =1000
tip= 20
def dividBill(payment):
    toatlpayment=payment+tip
    return toatlpayment/5
for i in range (1,6):
    print(f"person{i} will pay {dividBill(payment)}")

