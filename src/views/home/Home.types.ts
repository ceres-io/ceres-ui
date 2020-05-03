export interface IHomeInput {
  firstName?: string
}

export interface IHomeEvents {
  onNewCart: (zipCode: string) => void
}

export type HomeProps = IHomeInput & IHomeEvents