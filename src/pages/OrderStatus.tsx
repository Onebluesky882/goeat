import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ClipboardList } from "lucide-react";

// Sample initial order data
const initialOrders = [
  {
    id: "order1",
    tableId: "1",
    tableName: "A1",
    items: [
      { name: "Pad Thai", quantity: 1, price: 90 },
      { name: "Thai Iced Tea", quantity: 2, price: 30 },
    ],
    status: "pending",
    orderTime: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    total: 150,
  },
  {
    id: "order2",
    tableId: "3",
    tableName: "A3",
    items: [
      { name: "Green Curry", quantity: 1, price: 110 },
      { name: "Steamed Rice", quantity: 2, price: 20 },
    ],
    status: "cooking",
    orderTime: new Date(Date.now() - 1000 * 60 * 8).toISOString(), // 8 minutes ago
    total: 150,
  },
  {
    id: "order3",
    tableId: "6",
    tableName: "VIP-1",
    items: [
      { name: "Tom Yum Goong", quantity: 1, price: 120 },
      { name: "Pineapple Fried Rice", quantity: 1, price: 100 },
      { name: "Coconut Water", quantity: 2, price: 40 },
    ],
    status: "served",
    orderTime: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
    total: 300,
  },
  {
    id: "order4",
    tableId: "2",
    tableName: "A2",
    items: [
      { name: "Massaman Curry", quantity: 1, price: 130 },
      { name: "Spring Rolls", quantity: 1, price: 70 },
    ],
    status: "pending",
    orderTime: new Date(Date.now() - 1000 * 60 * 2).toISOString(), // 2 minutes ago
    total: 200,
  },
];

// Order status options and their color mappings
const statusOptions = [
  { value: "pending", label: "Pending", color: "bg-yellow-500" },
  { value: "cooking", label: "Cooking", color: "bg-orange-500" },
  { value: "served", label: "Served", color: "bg-green-500" },
  { value: "completed", label: "Completed", color: "bg-blue-500" },
  { value: "cancelled", label: "Cancelled", color: "bg-red-500" },
];

const OrderStatus = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState("all");

  // Simulate receiving new orders
  useEffect(() => {
    const interval = setInterval(() => {
      const randomAction = Math.random();

      if (randomAction < 0.2) {
        // 20% chance to add a new order
        const newOrder = {
          id: `order${Date.now()}`,
          tableId: `${Math.floor(Math.random() * 7) + 1}`,
          tableName: `${["A", "B", "VIP-"][Math.floor(Math.random() * 3)]}${
            Math.floor(Math.random() * 5) + 1
          }`,
          items: [
            {
              name: ["Pad Thai", "Tom Yum", "Green Curry", "Mango Sticky Rice"][
                Math.floor(Math.random() * 4)
              ],
              quantity: 1,
              price: 90 + Math.floor(Math.random() * 50),
            },
          ],
          status: "pending",
          orderTime: new Date().toISOString(),
          total: 90 + Math.floor(Math.random() * 50),
        };

        setOrders((prevOrders) => [...prevOrders, newOrder]);
        toast.success(`New order received from Table ${newOrder.tableName}`);
      } else if (randomAction < 0.5 && orders.length > 0) {
        // 30% chance to update an existing order status
        const orderToUpdate = orders[Math.floor(Math.random() * orders.length)];

        if (orderToUpdate.status === "pending") {
          handleStatusChange(orderToUpdate.id, "cooking");
        } else if (orderToUpdate.status === "cooking") {
          handleStatusChange(orderToUpdate.id, "served");
        }
      }
    }, 20000); // Perform random actions every 20 seconds

    return () => clearInterval(interval);
  }, [orders]);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

    const updatedOrder = orders.find((order) => order.id === orderId);
    if (updatedOrder) {
      toast.info(
        `Order for Table ${updatedOrder.tableName} is now ${newStatus}`
      );
    }
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  // Sort orders with pending and cooking first
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const priorityOrder = {
      pending: 0,
      cooking: 1,
      served: 2,
      completed: 3,
      cancelled: 4,
    };
    return (
      priorityOrder[a.status as keyof typeof priorityOrder] -
      priorityOrder[b.status as keyof typeof priorityOrder]
    );
  });

  return (
    <div className="container mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Real-Time Orders</h1>
          <p className="text-gray-600">
            Monitor and update orders from all tables
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select defaultValue="all" onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              {statusOptions.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">
            <ClipboardList className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {sortedOrders.length > 0 ? (
          sortedOrders.map((order) => (
            <Card
              key={order.id}
              className={`
              border-l-4 
              ${order.status === "pending" ? "border-l-yellow-500" : ""} 
              ${order.status === "cooking" ? "border-l-orange-500" : ""} 
              ${order.status === "served" ? "border-l-green-500" : ""} 
              ${order.status === "completed" ? "border-l-blue-500" : ""} 
              ${order.status === "cancelled" ? "border-l-red-500" : ""}
            `}
            >
              <CardHeader className="p-4 pb-0">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">
                    Table {order.tableName}
                  </CardTitle>
                  <Badge
                    className={`
                    ${order.status === "pending" ? "bg-yellow-500" : ""} 
                    ${order.status === "cooking" ? "bg-orange-500" : ""} 
                    ${order.status === "served" ? "bg-green-500" : ""} 
                    ${order.status === "completed" ? "bg-blue-500" : ""} 
                    ${order.status === "cancelled" ? "bg-red-500" : ""}
                  `}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="text-sm text-gray-500">
                    Order time: {new Date(order.orderTime).toLocaleTimeString()}
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <h4 className="font-medium mb-2">Order Items:</h4>
                    <ul className="space-y-1">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="flex justify-between text-sm">
                          <span>
                            {item.quantity}× {item.name}
                          </span>
                          <span>{item.price * item.quantity} ฿</span>
                        </li>
                      ))}
                    </ul>
                    <div className="border-t border-gray-200 mt-2 pt-2 font-medium flex justify-between">
                      <span>Total</span>
                      <span>{order.total} ฿</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <h4 className="font-medium mb-2">Update Status:</h4>
                    <Select
                      defaultValue={order.status}
                      onValueChange={(value) =>
                        handleStatusChange(order.id, value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
            <ClipboardList className="h-12 w-12 mb-4" />
            <h3 className="text-lg font-medium">No Orders Found</h3>
            <p className="text-sm mt-2">
              There are no orders matching your filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderStatus;
