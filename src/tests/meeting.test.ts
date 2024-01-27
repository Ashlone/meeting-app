import request from "supertest";
import app from "../index";
import { PrismaClient } from "@prisma/client";
import { databaseConnection } from "../config/dbConnect";

const prisma = new PrismaClient();

describe("Create meeting", () => {
  beforeAll(async () => {
    await databaseConnection();
  });

  /*
 beforeEach(async () => {
    await prisma.meeting.deleteMany(); // Clear all meetings before each test
  });

  afterAll(async () => {
    await prisma.$disconnect(); // Disconnect from the testing database
  });

  */

  // Test case for creating a new meeting
  it("should create a new meeting", async () => {
    // Defining the meeting payload
    const meetingData = {
      meetingType: "MANCO",
      meetingDate: "2024-01-26T05:44:35.235Z",
      meetingTime: "2024-01-26T05:44:35.235Z",
    };

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

    // Send a POST request to create a new meeting
    const response = await request(app)
      .post("/api/meetings")
      .send({ ...meetingData, meetingNumber: newMeetingNumber });

    expect(response.status).toBe(200);

    //Checking if the response body contains the expected meeting details
    expect(response.body).toHaveProperty(
      "meetingType",
      meetingData.meetingType
    );
    expect(response.body).toHaveProperty(
      "meetingDate",
      meetingData.meetingDate
    );
    expect(response.body).toHaveProperty(
      "meetingTime",
      meetingData.meetingTime
    );
    expect(response.body).toHaveProperty("meetingNumber", newMeetingNumber);
  });
});

describe("Get All Meetings", () => {

  it("should fetch all meetings", async () => {

    try {
      const response = await request(app).get(
        "/api/meetings"
      );
      expect(response.status).toBe(200);
    } catch (error) {
      console.error("Error fetching meetings:", error);
      throw new Error("Failed to fetch meetings");
    }
  });
});
describe("Get Previous Meeting Items", () => {

  it("should fetch previous meeting items", async () => {
    const meetingType = "MANCO";

    try {
      const response = await request(app).get(
        `/api/meetings/${meetingType}/previous-items`
      );
      expect(response.status).toBe(200)
    } catch (error) {
      console.error("Error fetching previous meeting items:", error);
      throw new Error("Failed to fetch previous meeting items");
    }
  });
});

describe("Create new meeting item", () => {
  it("should create a new meeting item along with a new meeting status", async () => {
    const meetingId = "clrvzst2m0000148n0rtiywyt";
    const description = "Discuss project timeline";
    const dueDate = "2024-01-26T05:44:35.235Z";

    const res = await request(app)
      .post(`/api/meetings/${meetingId}/items`)
      .send({ description, dueDate });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('newMeetingItem');
    expect(res.body).toHaveProperty('newMeetingStatus');

    // Check meeting item properties
    expect(res.body.newMeetingItem).toHaveProperty('description', description);
    expect(res.body.newMeetingItem).toHaveProperty('dueDate', dueDate);
    expect(res.body.newMeetingItem).toHaveProperty('meetingId', meetingId)
      
    // Check meeting status properties
    expect(res.body.newMeetingStatus).toHaveProperty('status', 'OPEN');
    expect(res.body.newMeetingStatus).toHaveProperty('action_required', 'eg New Meeting');
    expect(res.body.newMeetingStatus).toHaveProperty('responsible_person', 'James');
  });
});


describe("Update Meeting Item Status", () => {
  it("should update the status of a specific meeting item", async () => {
    
    const meetingItemId = "clrumadvl0002h14vf0xvgtir";
    const newStatus = "IN_DEVELOPMENT";
    const newAction = "New APIs will be developed";

    const res = await request(app)
      .put(`/api/meetings/items/${meetingItemId}/status`)
      .send({
        status: newStatus,
        action_required: newAction,
        responsible_person:"Ashlone"
      });

    expect(res.status).toBe(200);
  });
});
