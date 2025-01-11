

test("Api returns 200", async () => {
  const response = await fetch("http://localhost:3000/api/register", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = response.json();
  console.log(data);
});

test("Api returns 200 for successfull register", async () => {
  const response = await fetch("http://localhost:3000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: `test@example.com`,
      name: "Test User",
      password: "password123",
    }),
  });

  expect(response.status).toBe(200);
  const data = await response.json();
  expect(data).toEqual({ success: "true" });
});

test("Api returns 400 for duplicate email", async () => {
  const response = await fetch("http://localhost:3000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "test@test.com",
      name: "Test User",
      password: "password123",
    }),
  });
  expect(response.status).toBe(400);
  const data = await response.json();
  expect(data).toEqual({ error: "Email is already taken" });
});

// test("Api returns 200 for POST /api/recipes with valid user", async () => {

   
//     (getCurrentUser as jest.Mock).mockImplementation(() => Promise.resolve({
//         createdAt: "2023-01-01T00:00:00.000Z",
//         updatedAt: "2023-01-01T00:00:00.000Z",
//         emailVerified: null,
//         id: "321321321321",
//         name: "Test User",
//         email: "testtttt@test.com",
//         password: null,
//         image: null,
//         favouriteIds: [],
//         role: "user",
//     }));

//   const response = await fetch("http://localhost:3000/api/recipes", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       title: "Test",
//       category: ["Dinner", "Bread"],
//       ingredients: [{ quantity: "2", measurement: "tbs", name: "water" }],
//       servingsCount: 2,
//       calories: 11,
//       cookTime: 2,
//       description: "test",
//       imageSrc: "",
//     }),
//   });

//   // Check for successful response
//   expect(response.status).toBe(200);

//   // Parse the JSON response
//   const data = await response.json();

//   // Validate the response structure
//   expect(data).toHaveProperty("title", "Test");
//   expect(data).toHaveProperty("category");
//   expect(data.category).toEqual(["Dinner", "Bread"]);
//   expect(data).toHaveProperty("ingredients");
//   expect(data.ingredients).toEqual([
//     { quantity: "2", measurement: "tbs", name: "water" },
//   ]);
//   expect(data).toHaveProperty("servings", 2);
//   expect(data).toHaveProperty("calories", 11);
//   expect(data).toHaveProperty("cookTime", 2);
//   expect(data).toHaveProperty("content", "test");
//   expect(data).toHaveProperty("imageUrl", "");
// });
