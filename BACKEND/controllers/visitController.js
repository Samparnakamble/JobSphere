import { Visit } from "../models/visitSchema.js";

// Get Visit Count
export const getVisitCount = async (req, res) => {
  try {
    let visitData = await Visit.findOne();
    if (!visitData) {
      visitData = new Visit({ count: 0 });
      await visitData.save();
    }
    res.json({ count: visitData.count });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update Visit Count
export const updateVisitCount = async (req, res) => {
  try {
    let visitData = await Visit.findOne();
    if (!visitData) {
      visitData = new Visit({ count: 1 });
    } else {
      visitData.count += 1;
    }
    await visitData.save();
    res.json({ count: visitData.count });
  } catch (error) {
    res.status(500).json({ message: "Error updating count", error });
  }
};
