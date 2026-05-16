import { expect, test } from "@playwright/test";

test("homepage renders Optomachina content instead of the Next starter", async ({
  page,
}) => {
  const consoleMessages: string[] = [];

  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      consoleMessages.push(`${message.type()}: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => {
    consoleMessages.push(`pageerror: ${error.message}`);
  });

  await page.goto("/");

  await expect(page).toHaveTitle(/Optomachina/);
  await expect(
    page.getByText("Hardware for Earth, Sky, Space, and Light."),
  ).toBeVisible();
  await expect(
    page.getByText("Available for full-time roles and consulting"),
  ).toBeVisible();
  await expect(page.getByText("To get started, edit the page.tsx file.")).toHaveCount(
    0,
  );
  await expect(page.locator("article")).toHaveCount(3);

  await page.getByRole("link", { name: "Work" }).click();
  await expect(page).toHaveURL(/#work$/);
  expect(consoleMessages).toEqual([]);
});
