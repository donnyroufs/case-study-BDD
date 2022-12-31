import Express from "express"
import { Server as HttpServer } from "http"
import { None, Option, Some } from "ts-results"

export abstract class Server {
  protected readonly app = Express()
  private _server?: HttpServer

  public abstract setup(): Promise<void>

  public async start(): Promise<void> {
    this.app.use(Express.json())
    await this.setup()

    this._server = this.app.listen(5000, () => {
      console.log("web-api is up and running")
    })
  }

  public async dispose(): Promise<void> {
    await this._server?.close()
    this._server = undefined
  }

  public getHttpServer(): Option<HttpServer> {
    if (!this._server) {
      return None
    }

    return Some(this._server)
  }
}
