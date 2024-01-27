import express from "express"
import { createMeeting, createMeetingItem, getAllMeetings, getMeetingItemStatus, getPreviousMeetingItems, updateMeetingItemStatus } from "../controllers/meetingController"

const router = express.Router()

router.post("/",createMeeting)
router.get("/",getAllMeetings)
router.get("/:meetingType/previous-items",getPreviousMeetingItems)
router.post("/:meetingId/items",createMeetingItem)
router.put("/items/:meetingItemId/status",updateMeetingItemStatus)
router.get("/items/:meetingItemId",getMeetingItemStatus)
export default router