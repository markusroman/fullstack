import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, cleanup, fireEvent } from "@testing-library/react"
import TestBlog from "./TestBlog"
import Blog from "./Blog"

afterEach(cleanup)
describe("Test blog", () => {
  test("renders title, author and likes", () => {
    const blog = {
      title: "Hyvää settiä",
      author: "Testaaja",
      url: "moikdaad",
      user: "afapdad",
      likes: 4,
    }

    const component = render(<TestBlog blog={blog} />)

    expect(component.container).toHaveTextContent("Hyvää settiä")
    expect(component.container).toHaveTextContent("Testaaja")
    expect(component.container).toHaveTextContent("4")
  })

  test("clicking the button twice calls event handler twice", async () => {
    const mockHandler = jest.fn()

    const blog = {
      title: "Hyvää settiä",
      author: "hafpidhpa",
      url: "moikdaad",
      user: "afapdad",
    }

    const { getByText } = render(<TestBlog blog={blog} onClick={mockHandler} />)

    const button = getByText("like")
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})

describe("Own blog component", () => {
  test("shows only some content by default", async () => {
    const mockHandler = jest.fn()

    const blog = {
      title: "Hyvää settiä",
      author: "hafpidhpa",
      url: "moikdaad",
      user: "afapdad",
    }
    const user = {
      username: "afapdad",
    }

    const component = render(
      <Blog
        blog={blog}
        delBlog={mockHandler}
        addLike={mockHandler}
        changeShow={mockHandler}
        user={user}
      />
    )
    const div1 = component.container.querySelector(".someContent")
    const div2 = component.container.querySelector(".allContent")
    expect(div1 !== null)
    expect(div2 === null)
  })
  test("can change what's shown", async () => {
    const mockHandler = jest.fn()

    const blog = {
      title: "Hyvää settiä",
      author: "hafpidhpa",
      url: "moikdaad",
      user: "afapdad",
    }
    const user = {
      username: "afapdad",
    }

    const component = render(
      <Blog
        blog={blog}
        delBlog={mockHandler}
        addLike={mockHandler}
        changeShow={mockHandler}
        user={user}
      />
    )
    const div1 = component.container.querySelector(".someContent")
    const div2 = component.container.querySelector(".allContent")
    expect(div1 !== null)
    expect(div2 === null)
    fireEvent.click(div1)
    expect(div1 === null)
    expect(div2 !== null)
  })
})
