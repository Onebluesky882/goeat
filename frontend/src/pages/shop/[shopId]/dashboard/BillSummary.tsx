import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { QrCode, Printer } from "lucide-react";

type Item = {
  name: string;
  quantity: number;
  price: number;
};
type Bill = {
  id: string;
  tableName: string;
  items: Item[];
  subtotal: number;
  serviceCharge: number;
  total: number;
  orderTime: string;
  billTime: string;
};
// Sample bill data
const billData: Record<string, Bill> = {
  tableA1: {
    id: "bill1",
    tableName: "A1",
    items: [
      { name: "Pad Thai", quantity: 1, price: 90 },
      { name: "Thai Iced Tea", quantity: 2, price: 30 },
      { name: "Tom Yum Goong", quantity: 1, price: 120 },
    ],
    subtotal: 270,
    serviceCharge: 27,
    total: 297,
    orderTime: "2025-05-11T12:35:00Z",
    billTime: "2025-05-11T13:20:00Z",
  },
  tableVIP1: {
    id: "bill2",
    tableName: "VIP-1",
    items: [
      { name: "Green Curry", quantity: 2, price: 110 },
      { name: "Steamed Rice", quantity: 3, price: 20 },
      { name: "Coconut Ice Cream", quantity: 2, price: 60 },
      { name: "Mango Sticky Rice", quantity: 1, price: 80 },
    ],
    subtotal: 480,
    serviceCharge: 48,
    total: 528,
    orderTime: "2025-05-11T12:15:00Z",
    billTime: "2025-05-11T13:30:00Z",
  },
};

const BillSummary = () => {
  const { tableId } = useParams();
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  // Get bill based on tableId parameter, fallback to A1 if no match found
  const bill = billData[`table${tableId}`] || billData.tableA1;

  const handleConfirmPayment = () => {
    toast.success(`Payment for Table ${bill.tableName} has been confirmed!`);
    setShowPaymentSuccess(true);
  };

  const handlePrintBill = () => {
    toast.info("Printing bill...");
    // In a real app, this would trigger a print functionality
  };

  return (
    <div className="container max-w-2xl mx-auto">
      <Card className="border-none shadow-lg">
        <CardHeader className="bg-orange-100 border-b pb-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">Bill Summary</CardTitle>
              <p className="text-sm font-medium mt-1">Table {bill.tableName}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">
                Order #{bill.id.replace("bill", "")}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {new Date(bill.billTime).toLocaleDateString()} •{" "}
                {new Date(bill.billTime).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Receipt content */}
            <div>
              <h3 className="font-medium mb-3">Order Details</h3>
              <div className="space-y-2">
                {bill.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>
                      {item.quantity}× {item.name}
                    </span>
                    <span>{item.price * item.quantity} ฿</span>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{bill.subtotal} ฿</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Service Charge (10%)</span>
                  <span>{bill.serviceCharge} ฿</span>
                </div>
                <div className="flex justify-between font-medium text-lg mt-2">
                  <span>Total</span>
                  <span>{bill.total} ฿</span>
                </div>
              </div>
            </div>

            {showPaymentSuccess ? (
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="inline-flex items-center justify-center rounded-full bg-green-100 p-2">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  Payment successful
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Thank you for dining with us. We hope to see you again soon!
                </p>
              </div>
            ) : (
              <>
                {/* QR Code for payment */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-center mb-4">Scan to Pay</h3>
                  <div className="flex justify-center">
                    <div className="p-2 bg-white border border-gray-200 rounded-lg">
                      <QrCode className="h-48 w-48 text-gray-900" />
                    </div>
                  </div>
                  <p className="text-center text-sm mt-4 text-gray-600">
                    Scan this QR code with your mobile banking app to pay the
                    bill
                  </p>
                </div>

                {/* Payment buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleConfirmPayment}
                    className="flex-1 bg-orange-600 hover:bg-orange-700"
                  >
                    Confirm Payment
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handlePrintBill}
                  >
                    <Printer className="mr-2 h-4 w-4" /> Print Bill
                  </Button>
                </div>
              </>
            )}

            {/* Restaurant information */}
            <div className="text-center text-sm text-gray-500 pt-4 border-t">
              <p className="font-medium">
                🧑‍🍳 MenuX – Real-Time Restaurant Management Platform
              </p>
              <p>Bangkok 10110</p>
              <p>Tel: 083-775-4288</p>
              <p className="mt-2">Thank you for your visit!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillSummary;
