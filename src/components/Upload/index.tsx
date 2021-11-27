import {FC} from 'react'
import Upload, {UploadProps} from "./Upload";
import UploadList, {UploadListProps} from "./UploadList";
import Dragger, {DraggerProps} from "./Dragger";

type UploadType = FC<UploadProps> & {
    UploadList: FC<UploadListProps>;
    Dragger: FC<DraggerProps>;
}
const _Upload = Upload as UploadType
_Upload.UploadList = UploadList
_Upload.Dragger = Dragger

export default _Upload
