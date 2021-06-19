import { serialize } from "cookie";

export default async (req, res) => {
  res.setHeader("Set-Cookie", [
    serialize("username", "", {
      maxAge: -1,
      path: "/",
    }),
    serialize("access_token", "", {
      maxAge: -1,
      path: "/",
    }),
  ]);

  res.redirect("/");
};
