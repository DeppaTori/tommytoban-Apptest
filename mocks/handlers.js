import { rest } from "msw";
import { API_URL } from "../constants";
export const handlers = [
  rest.post("/login", (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem("is-authenticated", "true");
    return res(
      // Respond with a 200 status code
      ctx.status(200)
    );
  }),
  rest.get("/user", (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem("is-authenticated");
    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "Not authorized",
        })
      );
    }
    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: "admin",
      })
    );
  }),

  rest.get(`${API_URL}/contact`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "Get contacts",
        data: [
          {
            id: "93ad6070-c92b-11e8-b02f-cbfa15db428b",
            firstName: "Bilbo",
            lastName: "Baggins",
            age: 111,
            photo:
              "http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550",
          },
          {
            id: "b3abd640-c92b-11e8-b02f-cbfa15db428b",
            firstName: "Tiara",
            lastName: "Skywalker",
            age: 20,
            photo: "N/A",
          },
        ],
      })
    );
  }),
];
