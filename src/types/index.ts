
// Define the Types enum
export enum Types{
    MANCO = "MANCO",
    FINANCE = "FINANCE",
    PTL = "PTL",
  }

  export enum Status{
    OPEN = "OPEN",
    IN_DEVELOPMENT = "IN_DEVELOPMENT",
    Awaiting_Invoicing = "Awaiting_Invoicing",
    CLOSED = "Awaiting_Invoicing",
}

export type MeetingRequestBody = {
    meetingType: Types | undefined;
    meetingDate: Date;
    meetingTime: Date;
    carriedForwardItems: any;
    meetingNumber: number;
  }

export type MeetingItemRequestBody={
    meetingId:string;
    description:string;
    dueDate: Date;
}

export type PreviousMeetingItems={
meetingType:string;
}

export type MeetingItemStatus={
     status:Status;
     action_required:string
     responsible_person:string
}
  