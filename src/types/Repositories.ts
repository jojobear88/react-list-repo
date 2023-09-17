import { PageInfo } from "./PageInfo";
import { Repository } from "./Repository";

export interface Repositories {
  totalCount: number;
  nodes: Repository[];
  pageInfo: PageInfo;
}
