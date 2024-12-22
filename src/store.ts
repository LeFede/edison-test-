import { atom } from "nanostores";

export const searchBar = atom("");

export const selectedCategories = atom([]);
export const selectedDuration = atom([]);
export const selectedPrice = atom([]);
export const selectedModality = atom([]);

export const showAllCourses = atom(false);

export const showCategories = atom(true);
export const showDuration = atom(false);
export const showPrice = atom(false);
export const showModality = atom(false);

export const isScrolling = atom(false);
