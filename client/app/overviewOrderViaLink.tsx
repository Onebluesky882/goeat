// OrderViewPage.tsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function OrderViewPage() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [data, setData] = useState(null);

  useEffect(() => {
    if (token) {
      api
        .get(`/public/orders/view?token=${token}`)
        .then((res) => setData(res.data))
        .catch(() => alert("Invalid link"));
    }
  }, [token]);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Table {data.session.tableNumber}</h1>
      <ul>
        {data.orders.map((o) => (
          <li key={o.id}>
            {o.quantity}× {o.menuId} — ฿{o.quantity * o.priceEach}
          </li>
        ))}
      </ul>
      <p>Total: ฿{data.session.totalPrice}</p>
    </div>
  );
}
