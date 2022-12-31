import { mock, mockClear } from "jest-mock-extended"
import { Response } from "express"

import { WithdrawCashRequestMiddleware } from "./WithdrawCashRequestMiddleware"
import { WithdrawCashRequest } from "../../../core"

describe("WithdrawCashRequestMiddleware", () => {
  const mockedResponse = mock<Response>()
  let sut: WithdrawCashRequestMiddleware

  beforeAll(() => {
    sut = new WithdrawCashRequestMiddleware()
  })

  afterEach(() => {
    mockClear(mockedResponse)
  })

  test("sends a 400 status when an arguments type is not of the expected type", async () => {
    await sut.handle(
      {
        body: {
          cardId: "myCardId",
        },
      } as any,
      mockedResponse,
      jest.fn()
    )

    expect(mockedResponse.sendStatus).toHaveBeenCalledWith(400)
  })

  test("calls next when everything is fine", async () => {
    const nextFn = jest.fn()
    const request = new WithdrawCashRequest("myCardId", 50)

    await sut.handle(
      {
        body: request,
      } as any,
      mockedResponse,
      nextFn
    )

    expect(mockedResponse.sendStatus).not.toHaveBeenCalledWith(400)
    expect(nextFn).toHaveBeenCalled()
  })
})
