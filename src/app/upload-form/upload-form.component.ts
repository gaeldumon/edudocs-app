import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NzUploadChangeParam} from "ng-zorro-antd/upload";
import {NzMessageService} from "ng-zorro-antd/message";
import {DocumentService} from "../services/document.service";

@Component({
  selector: 'upload-form-component',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

  public tagInputVisible: boolean;
  public tagInputValue: string;
  public tags: string[];
  public filename: string;
  public fileBase64: string | ArrayBuffer | null;
  public studentEmail: string;

  @ViewChild('inputElement', {static: false}) inputElement?: ElementRef;

  constructor(private messageService: NzMessageService, private documentService: DocumentService) {
    this.tagInputVisible = false;
    this.tagInputValue = "";
    this.tags = [];
    this.filename = "";
    this.fileBase64 = "";
    this.studentEmail = "";
  }

  ngOnInit(): void {
  }

  /**
   * Submit the document upload form. Call the sendDocument method of the documentService.
   * Construct the necessary payload with the studentEmail, the filename and the externalEmails
   * (compliance to ISendDocumentRequestBody). Print success or error toast message.
   */
  submitForm(): void {
    this.documentService.sendDocument({
      fileBase64: this.fileBase64,
      filename: this.filename,
      studentEmail: this.studentEmail,
      externalEmails: this.tags
    }).subscribe(
      data => {
        console.log("ok", data)
        if (data.status === "success") {
          this.messageService.success(`${this.filename} a été envoyé à l'étudiant ${this.studentEmail} et aux intervenants ${this.tags.join("-")}`);
        } else {
          this.messageService.error(`${this.filename} n'a pas pu être envoyé pour la raison suivante : ${data.message}`);
        }
      },
      err => {
        this.messageService.error(`${this.filename} n'a pas pu être envoyé, veuillez réessayer`);
      }
    )
  }

  /**
   * Handle the change event on the drag&drop upload input. Set the new filename on each change.
   * Print toast message on success or error.
   * @param file
   * @param fileList
   */
  handleUploadChange({file, fileList}: NzUploadChangeParam): void {
    if (file.status === "done") {

      // Setting the filename
      this.filename = file.name;

      // Setting the Base64 value of the file
      this.setFileBase64(<File>file.originFileObj);

      // Display success toast message
      this.messageService.success(`${file.name} file uploaded successfully.`);

    } else if (file.status === "error") {
      this.messageService.error(`${file.name} file upload failed.`);
    }
  }

  /**
   * Returns the Base64 value of a file.
   * Mutate the fileBase64 property.
   * @param file
   */
  private setFileBase64(file: File | Blob): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileBase64 = reader.result;
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
   * Show the external email input being filled.
   */
  showInput(): void {
    this.tagInputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  /**
   * Add the external email tag that has just been filled, to the tags. Triggered on keyboard ENTER.
   */
  handleInputConfirm(): void {
    if (this.tagInputValue && this.tags.indexOf(this.tagInputValue) === -1) {
      this.tags = [...this.tags, this.tagInputValue];
    }
    this.tagInputValue = "";
    this.tagInputVisible = false;
  }
}
