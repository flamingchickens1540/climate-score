package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/html"
	// "github.com/gofiber/fiber/v2/middleware/monitor"
	// "github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {

	engine := html.New("./templates", ".html")

	app := fiber.New(fiber.Config{
		Views: engine,
	})

	app.Static("/public", "./public")
	app.Get("/", mainPage)
	app.Listen(":3000")

	//debugging stuff
	// app.Use(logger.New())
	// app.Get("/metrics", monitor.New())
}

func mainPage(c *fiber.Ctx) error {
	return c.Render("mainpage", fiber.Map{})
}
