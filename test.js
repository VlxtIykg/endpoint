const fetch = require("node-fetch");
const formData = 19;
(async () => {
const response = await fetch("http://localhost:3000/bot", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  //mode: "cors",
  body: JSON.stringify({
    id: 1,
    status: 0,
    capacity: "300k",
    coins_per_hour: "9m",
    total_made: "24m",
  }),
  //	body: '{"amount":24, "id": 1}'
  //	'{ "amount": 7,"id": 1}'
});

	const data = await response.json();
	console.log(data);

})();
