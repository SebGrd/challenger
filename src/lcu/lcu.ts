
import { authenticate, Credentials, LeagueClient, createHttp1Request } from 'league-connect'

export class LCU {
    private static instance: LCU;
  
    private leagueClient: LeagueClient;
    private credentials: Credentials;
  
    private constructor() {}
  
    public static async getInstance(): Promise<LCU> {
      if (!LCU.instance) {
        LCU.instance = new LCU();
        await LCU.instance.init();
      }
      return LCU.instance;
    }
  
    private async init(): Promise<void> {
      this.credentials = await this.authenticate();
      if (!this.credentials) {
        throw new Error("Failed to authenticate and initialize credentials.");
      }
    }
  
    private async authenticate(): Promise<Credentials> {
      return authenticate();
    }
  
    public getLeagueClient(): LeagueClient {
      if (!this.leagueClient) {
        if (!this.credentials) {
          throw new Error("Credentials are not initialized.");
        }
        this.leagueClient = new LeagueClient(this.credentials);
      }
      return this.leagueClient;
    }
  
    public async getSummoner(): Promise<any> {
      if (!this.credentials) {
        throw new Error("Credentials are not initialized. Make sure `init` has completed.");
      }
  
      console.log("GET SUMMONER");
      console.log(this.credentials);
  
      const response = await createHttp1Request(
        {
          method: "GET",
          url: "/lol-summoner/v1/current-summoner",
        },
        this.credentials
      );
  
      return response.json();
    }
  }