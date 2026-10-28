// PlumePlot's deterministic planning model. Scene interaction wiring reads these
// methods so risk labels and the review state always use the same source of truth.
@component
export class PlumePlotController extends BaseScriptComponent {
  @input profile: string = "Cargo"
  @input replayDurationSeconds: number = 6

  private readonly cargoRadius = 20
  private readonly heavyRadius = 30
  private readonly buffer = 10
  private replayRunning = false

  onAwake() {
    print("[PlumePlot] tabletop planner ready; profile=" + this.profile)
  }

  public setProfile(profile: string) { if (!this.replayRunning) this.profile = profile }
  public beginReplay() { this.replayRunning = true }
  public finishReplay() { this.replayRunning = false }
  public isReplayRunning(): boolean { return this.replayRunning }
  public getHazardRadius(): number { return this.profile === "Heavy" ? this.heavyRadius : this.cargoRadius }
  public classify(distanceCm: number, inForwardCorridor: boolean, ridgeBetween: boolean): string {
    let risk = distanceCm <= this.getHazardRadius() ? "HIGH RISK" :
      (distanceCm <= this.getHazardRadius() + this.buffer || inForwardCorridor ? "REVIEW" : "CLEAR")
    if (ridgeBetween && distanceCm > this.getHazardRadius()) {
      if (risk === "HIGH RISK") risk = "REVIEW"
      else if (risk === "REVIEW") risk = "CLEAR"
    }
    return risk
  }
  public siteReview(risks: string[]): string { return risks.every(r => r === "CLEAR") ? "SITE READY" : "REPLAN REQUIRED" }
}
