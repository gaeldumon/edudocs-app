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
  public studentEmail: string;

  @ViewChild('inputElement', {static: false}) inputElement?: ElementRef;

  constructor(private messageService: NzMessageService, private documentService: DocumentService) {
    this.tagInputVisible = false;
    this.tagInputValue = "";
    this.tags = [];
    this.filename = "";
    this.studentEmail = "";
  }

  ngOnInit(): void {
  }

  /**
   *
   */
  submitForm(): void {
    this.documentService.sendDocument({
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
   *
   * @param file
   * @param fileList
   */
  handleUploadChange({file, fileList}: NzUploadChangeParam): void {
    if (file.status === "done") {
      this.filename = file.name;
      this.messageService.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.messageService.error(`${file.name} file upload failed.`);
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
