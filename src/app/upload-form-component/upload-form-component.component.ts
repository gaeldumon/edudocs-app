import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NzUploadChangeParam} from "ng-zorro-antd/upload";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-upload-form-component',
  templateUrl: './upload-form-component.component.html',
  styleUrls: ['./upload-form-component.component.css']
})
export class UploadFormComponentComponent implements OnInit {
  public tagInputVisible: boolean;
  public tagInputValue: string;
  public tags: string[];
  public docUploadActionUrl: string;
  @ViewChild('inputElement', {static: false}) inputElement?: ElementRef;

  constructor(private docUploadMessage: NzMessageService) {
    this.tagInputVisible = false;
    this.tagInputValue = "";
    this.tags = [];
    this.docUploadActionUrl = "https://www.mocky.io/v2/5cc8019d300000980a055e76"
  }

  ngOnInit(): void {
  }

  /**
   *
   */
  submitForm(): void {
    console.log("Form submitted");
  }

  /**
   *
   * @param file
   * @param fileList
   */
  handleChange({file, fileList}: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== "uploading") {
      console.log(file, fileList);
    }
    if (status === "done") {
      this.docUploadMessage.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.docUploadMessage.error(`${file.name} file upload failed.`);
    }
  }

  /**
   * Filter the tags property on the tags which had not been removed.
   * This method mutate the tags property directly.
   * @param removedTag
   */
  handleClose(removedTag: {}): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
  }

  /**
   * Return the 20 first characters of tag if tag is > 20 characters.
   * Return tag directly if tag <= 20 characters.
   * @param tag
   */
  sliceTagName(tag: string): string {
    return (tag.length > 20) ? `${tag.slice(0, 20)}...` : tag;
  }

  /**
   *
   */
  showInput(): void {
    this.tagInputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  /**
   *
   */
  handleInputConfirm(): void {
    if (this.tagInputValue && this.tags.indexOf(this.tagInputValue) === -1) {
      this.tags = [...this.tags, this.tagInputValue];
    }
    this.tagInputValue = "";
    this.tagInputVisible = false;
  }
}
