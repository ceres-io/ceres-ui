interface ITrackingState {
    trackingId: string,
    estTimeMinutes: number
}

interface ITrackingEvent {

}

export type TrackingProps = ITrackingState & ITrackingEvent