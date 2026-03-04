export interface MetTag {
  term: string;
  AAT_URL: string;
  Wikidata_URL: string;
}

export interface MetConstituent {
  constituentID: number;
  role: string;
  name: string;
  constituentULAN_URL: string;
  constituentWikidata_URL: string;
  gender: string;
}

export interface MetMeasurement {
  elementName: string;
  elementDescription: string | null;
  elementMeasurements: { [key: string]: number };
}

export interface MetObject {
  objectID: number;
  isHighlight: boolean;
  accessionNumber: string;
  accessionYear: string;
  isPublicDomain: boolean;
  primaryImage: string;
  primaryImageSmall: string;
  additionalImages: string[];
  constituents: MetConstituent[] | null;
  department: string;
  objectName: string;
  title: string;
  culture: string;
  period: string;
  dynasty: string;
  reign: string;
  portfolio: string;
  artistRole: string;
  artistPrefix: string;
  artistDisplayName: string;
  artistDisplayBio: string;
  artistSuffix: string;
  artistAlphaSort: string;
  artistNationality: string;
  artistBeginDate: string;
  artistEndDate: string;
  artistGender: string;
  artistWikidata_URL: string;
  artistULAN_URL: string;
  objectDate: string;
  objectBeginDate: number;
  objectEndDate: number;
  medium: string;
  dimensions: string;
  measurements: MetMeasurement[] | null;
  creditLine: string;
  geographyType: string;
  city: string;
  state: string;
  county: string;
  country: string;
  region: string;
  subregion: string;
  locale: string;
  locus: string;
  excavation: string;
  river: string;
  classification: string;
  rightsAndReproduction: string;
  linkResource: string;
  metadataDate: string;
  repository: string;
  objectURL: string;
  tags: MetTag[] | null;
  objectWikidata_URL: string;
  isTimelineWork: boolean;
  GalleryNumber: string;
}

export interface MetDepartment {
  departmentId: number;
  displayName: string;
}

export interface MetDepartmentsResponse {
  departments: MetDepartment[];
}

export interface MetSearchResponse {
  total: number;
  objectIDs: number[] | null;
}

export interface MetObjectsResponse {
  total: number;
  objectIDs: number[];
}

export interface ArtworkSummary {
  objectID: number;
  title: string;
  artistDisplayName: string;
  primaryImageSmall: string;
  objectDate: string;
  department: string;
  medium: string;
  isHighlight: boolean;
  isPublicDomain: boolean;
}

export interface PaginatedResult<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
