import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {
  MeetingItemRequestBody,
  MeetingItemStatus,
  MeetingRequestBody,
  PreviousMeetingItems,
  Types,
} from "../types";

const prisma = new PrismaClient();

export const createMeeting = async (req: Request, res: Response) => {
  try {
    const {
      meetingType,
      meetingDate,
      meetingTime,
      carriedForwardItems,
    }: MeetingRequestBody = req.body;

    // Checking if required fields are present
    if (!meetingType || !meetingDate || !meetingTime) {
      return res
        .status(400)
        .json({ error: "Meeting type, date, and time are required fields." });
    }

    // Retrieve the maximum meeting number from the database
    const maxMeetingNumber = await prisma.meeting.findFirst({
      orderBy: {
        meetingNumber: "desc",
      },
    });

    // Calculate the new meeting number
    const newMeetingNumber = maxMeetingNumber
      ? maxMeetingNumber.meetingNumber + 1
      : 1;

    const newMeeting = await prisma.meeting.create({
      data: {
        meetingType,
        meetingDate,
        meetingTime,
        meetingNumber: newMeetingNumber,
        meetingItems: {
          connect: carriedForwardItems.map((id: string) => ({ id })),
        },
      },
      include: {
        meetingItems: true,
      },
    });

    return res.status(200).json(newMeeting);
  } catch (error) {
    console.error("Error creating meeting:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getAllMeetings = async (req: Request, res: Response) => {
  try {
    const meetings = await prisma.meeting.findMany();
    return res.status(200).json(meetings);
  } catch (error) {
    console.error("Error in fetching meetings:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getPreviousMeetingItems = async (req: Request, res: Response) => {
  try {
    const { meetingType } = req.params;

    if (!meetingType) {
      return res
        .status(400)
        .json({ error: "Meeting type parameter is required." });
    }

    // Find the latest meeting number for the specified meeting type
    const latestMeeting = await prisma.meeting.findFirst({
      where: {
        meetingType: meetingType as Types,
      },
      orderBy: {
        meetingNumber: 'desc',
      },
    });

    // Fetch the previous meeting
    const previousMeetingItems = await prisma.meeting.findMany({
      where: {
        meetingNumber: latestMeeting?.meetingNumber,
        meetingType: meetingType as Types,
      },
      include:{
        meetingItems:{
          include:{
            meeting:{
              include:{
                meetingStatuses:true
              }
            }
          }
        }
      }
    });

    return res.status(200).json(previousMeetingItems);
  } catch (error) {
    console.error("Error in fetching previous meeting items:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const createMeetingItem = async (req: Request, res: Response) => {
  try {
    const { description, dueDate }: MeetingItemRequestBody = req.body;

    // Checking if required fields are present
    if (!description || !dueDate) {
      return res
        .status(400)
        .json({ error: "dueDate and description are required fields." });
    }

    const newMeetingItem = await prisma.meetingItem.create({
      data: {
        meetingId: req.params.meetingId,
        description,
        dueDate,
      },
    });

    // Create the associated meeting status with "Open" status
    const newMeetingStatus = await prisma.meetingStatus.create({
      data: {
        meetingId: req.params.meetingId,
        meetingItemId: newMeetingItem.id,
        status: "OPEN",
        action_required: "eg New Meeting",
        responsible_person: "James",
      },
    });

    res.status(200).json({ newMeetingItem, newMeetingStatus });
  } catch (error) {
    console.error("Error creating meeting item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateMeetingItemStatus = async (req: Request, res: Response) => {
  try {
    const { meetingItemId } = req.params;
    const { status, action_required, responsible_person }: MeetingItemStatus =
      req.body;

    // Validating required fields
    if (!status || !action_required || !responsible_person) {
      return res
        .status(400)
        .json({
          error:
            "Status, action required, and responsible person are required fields.",
        });
    }

    const updatedMeetingItem = await prisma.meetingStatus.update({
      where: { meetingItemId },
      data: { status, action_required, responsible_person },
    });

    return res.status(200).json(updatedMeetingItem);
  } catch (error) {
    console.error("Error updating meeting item status:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getMeetingItemStatus = async (req: Request, res: Response) => {
  try {
    const { meetingItemId } = req.params;

    // Fetch the meeting item status by its ID
    const meetingItemStatus = await prisma.meetingStatus.findUnique({
      where: {
        meetingItemId,
      },
    });

    // If the meeting item status is found, return it
    if (meetingItemStatus) {
      return res.status(200).json(meetingItemStatus);
    } else {
      return res.status(400).json({ error: "Meeting item status not found." });
    }
  } catch (error) {
    console.error("Error fetching meeting item status:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};