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

test("Api returns 200 for POST /api/recipes with valid user", async () => {
  const response = await fetch("http://localhost:3000/api/recipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie:
        "Idea-357f525c=e02d8351-f7cb-48a2-b9b0-734903eeff08; authjs.csrf-token=e363285c9ad5577bcc0ca43af73931bb6fdf165977e9d527eeca73ae143ee181%7C003e79a0cef423cf6b4aed26a022511e40b65de680379d854e7f8f5f1275b39a; authjs.callback-url=http%3A%2F%2Flocalhost%3A3000%2F; authjs.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoidlo3X3NXUU9sLXB1SDVQRWtNMDRma3hkVWIyMy1fckdaTjdVLTFveVowbHYybnRfTHBURFJtUGh2T05VOHdsOWtCUTN0S1lSNm9CRlJzdHVSQXM3WVEifQ..0FdS_ejpwLS_65_-VFghIA.AqKyPayKdN_uachRTbSkO80yaKuQsTsKmp6FSEOYvpwIWQ0AcPeqCaXyeW5e4KT-nXQOwBwojc31c7Sxt2TaZwBPH1SHs_GOGIx73EJtaxzTpdLq5YTMJ5JxZaR95jKM22gRfSR_GDqk3elCkHbKrkXDycgl66DZnk3wXq1i-z288zrsgVvNhppWGb-XS3brWAjOawX6YE1Z-bp7Iqy4nkJ19z6ypK17TJZKU3qY2MPwhT-VkDl-132n06pN5h8X.SACT5vFqeyhSHG7oyusc9nvUBnt4K879FYu3XI4AvQk",
    },
    body: JSON.stringify({
      title: "Test",
      category: ["Dinner", "Bread"],
      ingredients: [{ quantity: "2", measurement: "tbs", name: "water" }],
      servingsCount: 2,
      calories: 11,
      cookTime: 2,
      description: "test",
      imageSrc: "",
    }),
  });

  
  expect(response.status).toBe(200);

  const data = await response.json();

  expect(data).toHaveProperty("title", "Test");
  expect(data).toHaveProperty("category");
  expect(data.category).toEqual(["Dinner", "Bread"]);
  expect(data).toHaveProperty("ingredients");
  expect(data).toHaveProperty("servings", 2);
  expect(data).toHaveProperty("calories", 11);
  expect(data).toHaveProperty("cookTime", 2);
  expect(data).toHaveProperty("content", "test");
  expect(data).toHaveProperty("imageUrl", "");
});


test("Api returns 401 for POST /api/recipes without user", async () => {
    const response = await fetch("http://localhost:3000/api/recipes", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        title: "Test",
        category: ["Dinner", "Bread"],
        ingredients: [{ quantity: "2", measurement: "tbs", name: "water" }],
        servingsCount: 2,
        calories: 11,
        cookTime: 2,
        description: "test",
        imageSrc: "",
        }),
    });
    
    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data).toEqual("Unauthenticated");
});