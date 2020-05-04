export interface IHomeInput {

}

export interface IHomeEvents {
  onNewCart?: (zipCode: string) => void
}

export type HomeProps = IHomeInput & IHomeEvents