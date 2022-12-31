import { mock } from "jest-mock-extended"
import supertest, { SuperTest } from "supertest"

import {
  WithdrawCashRequest,
  WithdrawCashResponse,
  WithdrawCashUseCase,
} from "../../core"
import { WebApi } from "./WebApi"

describe("WebApi integration with express", () => {
  const mockedUseCase = mock<WithdrawCashUseCase>()
  const sut = new WebApi(mockedUseCase)
  let api: SuperTest<any>

  beforeAll(async () => {
    await sut.start()

    api = supertest(sut.getHttpServer().unwrap())
  })

  describe("endpoints", () => {
    test("Endpoint is reachable and matches the response contract", async () => {
      const request = new WithdrawCashRequest("cardId", 50)
      const response = new WithdrawCashResponse(100, 50)
      mockedUseCase.execute.mockResolvedValue(response)

      const result = await api.post("/withdraw").send(request)

      expect(result.body).toEqual(response)
      expect(result.status).toBe(200)
    })

    test("throws an exception when the request body is invalid", async () => {
      const response = new WithdrawCashResponse(100, 50)
      mockedUseCase.execute.mockResolvedValue(response)

      const result = await api.post("/withdraw")

      expect(result.status).toBe(400)
    })
  })

  afterAll(async () => {
    await sut.dispose()
  })
})
