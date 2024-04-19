import api from ".";
import { Candidate } from "../types";

const candidateRoute = '/candidates';

// Get all candidates.
export const getAllCandidates = async () => {
    try {
        const res = await api.get(candidateRoute);
        const candidates: Candidate[] = await res.data.payload;
        return candidates;
    } catch (err) {
        console.log(err);
    }
};

// Get a candidate by ID.
export const getCandidateById = async (id: number) => {
    try {
        const res = await api.get(`${candidateRoute}/${id}`);
        const candidate: Candidate = await res.data.payload
        return candidate;
    } catch (err) {
        console.log(err);
    }
};

// Create a candidate.
export const createCandidate = async (candidate: Candidate) => {
    try {
        const res = await api.post(candidateRoute, candidate);
        const action = await res.data.payload;
        return action;
    } catch (err) {
        console.log(err);
    }
};

// Modify a candidate.
export const modifyCandidate = async (id: number, tCandidate: Candidate) => {
    try {
        const res = await api.patch(`${candidateRoute}/${id}`, {data: tCandidate});
        const candidate: Candidate = await res.data.payload;
        return candidate;
    } catch (err) {
        console.log(err);
    }
};

// Delete a candidate.
export const deleteCandidate = async (id: number) => {
    try {
        const res = await api.delete(candidateRoute, {data: {id}});
        const action = await res.data.payload;
        return action;
    } catch (err) {
        console.log(err);
    }
};