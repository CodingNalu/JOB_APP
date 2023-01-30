import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../error/index.js";
const createJob = async (req, res) => {
  const { position, company } = req.body;
  if (!postion || !company) {
    throw new BadRequestError("Please provide all values");
  }
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
const deleteJob = async (req, res) => {
  res.send("deleteJob");
};
const getAllJobs = async (req, res) => {
  res.send("get All Jobs");
};
const updateJob = async (req, res) => {
  res.send("updateJob");
};
const showStats = async (req, res) => {
  res.send("showStats");
};
export { createJob, updateJob, deleteJob, getAllJobs, showStats };
