"use client";

import {
  AlertCircleIcon,
  CheckIcon,
  FileArchiveIcon,
  FileIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  FileUpIcon,
  HeadphonesIcon,
  ImageIcon,
  SendIcon,
  VideoIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatBytes, useFileUpload } from "@/hooks/use-file-upload";

// Create some dummy initial files
const initialFiles = [
  {
    name: "document.pdf",
    size: 528737,
    type: "application/pdf",
    url: "https://example.com/document.pdf",
    id: "document.pdf-1744638436563-8u5xuls",
  },
  {
    name: "intro.zip",
    size: 252873,
    type: "application/zip",
    url: "https://example.com/intro.zip",
    id: "intro.zip-1744638436563-8u5xuls",
  },
  {
    name: "conclusion.xlsx",
    size: 352873,
    type: "application/xlsx",
    url: "https://example.com/conclusion.xlsx",
    id: "conclusion.xlsx-1744638436563-8u5xuls",
  },
];

// Exemple d'utilisateurs - à remplacer par vos vraies données
const dummyUsers = [
  { id: "1", name: "Alice Dupont", email: "alice.dupont@example.com" },
  { id: "2", name: "Bob Martin", email: "bob.martin@example.com" },
  { id: "3", name: "Claire Bernard", email: "claire.bernard@example.com" },
  { id: "4", name: "David Petit", email: "david.petit@example.com" },
  { id: "5", name: "Emma Dubois", email: "emma.dubois@example.com" },
];

const getFileIcon = (file: { file: File | { type: string; name: string } }) => {
  const fileType = file.file instanceof File ? file.file.type : file.file.type;
  const fileName = file.file instanceof File ? file.file.name : file.file.name;

  if (
    fileType.includes("pdf") ||
    fileName.endsWith(".pdf") ||
    fileType.includes("word") ||
    fileName.endsWith(".doc") ||
    fileName.endsWith(".docx")
  ) {
    return <FileTextIcon className="size-4 opacity-60" />;
  } else if (
    fileType.includes("zip") ||
    fileType.includes("archive") ||
    fileName.endsWith(".zip") ||
    fileName.endsWith(".rar")
  ) {
    return <FileArchiveIcon className="size-4 opacity-60" />;
  } else if (
    fileType.includes("excel") ||
    fileName.endsWith(".xls") ||
    fileName.endsWith(".xlsx")
  ) {
    return <FileSpreadsheetIcon className="size-4 opacity-60" />;
  } else if (fileType.includes("video/")) {
    return <VideoIcon className="size-4 opacity-60" />;
  } else if (fileType.includes("audio/")) {
    return <HeadphonesIcon className="size-4 opacity-60" />;
  } else if (fileType.startsWith("image/")) {
    return <ImageIcon className="size-4 opacity-60" />;
  }
  return <FileIcon className="size-4 opacity-60" />;
};

export default function FileUploadWithSend() {
  const maxSize = 100 * 1024 * 1024; // 100MB
  const maxFiles = 10;

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      clearFiles,
      getInputProps,
    },
  ] = useFileUpload({
    multiple: true,
    maxFiles,
    maxSize,
    initialFiles,
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);

  // Filtrer uniquement les PDFs
  const pdfFiles = files.filter((file) => {
    const fileName =
      file.file instanceof File ? file.file.name : file.file.name;
    return fileName.toLowerCase().endsWith(".pdf");
  });

  const handleUserToggle = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === dummyUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(dummyUsers.map((u) => u.id));
    }
  };

  const handleSendFiles = async () => {
    if (pdfFiles.length === 0) {
      alert("Aucun fichier PDF à envoyer");
      return;
    }

    if (selectedUsers.length === 0) {
      alert("Veuillez sélectionner au moins un utilisateur");
      return;
    }

    setIsSending(true);

    try {
      // Récupérer les emails des utilisateurs sélectionnés
      const selectedEmails = dummyUsers
        .filter((user) => selectedUsers.includes(user.id))
        .map((user) => user.email);

      // TODO: Implémenter l'envoi réel des fichiers
      // Exemple d'appel API:
      // const formData = new FormData()
      // pdfFiles.forEach((fileObj) => {
      //   if (fileObj.file instanceof File) {
      //     formData.append('files', fileObj.file)
      //   }
      // })
      // formData.append('emails', JSON.stringify(selectedEmails))
      //
      // await fetch('/api/send-pdf', {
      //   method: 'POST',
      //   body: formData,
      // })

      // Simulation d'envoi
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert(
        `PDFs envoyés avec succès à ${selectedUsers.length} utilisateur(s):\n${selectedEmails.join("\n")}`,
      );

      // Réinitialiser la sélection et fermer le dialog
      setSelectedUsers([]);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      alert("Erreur lors de l'envoi des fichiers");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Drop area */}
      <div
        role="button"
        onClick={openFileDialog}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed border-input p-4 transition-colors hover:bg-accent/50 has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
      >
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload files"
        />

        <div className="flex flex-col items-center justify-center text-center">
          <div
            className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
            aria-hidden="true"
          >
            <FileUpIcon className="size-4 opacity-60" />
          </div>
          <p className="mb-1.5 text-sm font-medium">Envoi des fichiers</p>
          <p className="mb-2 text-xs text-muted-foreground">
            Drag & drop or click to browse
          </p>
          <div className="flex flex-wrap justify-center gap-1 text-xs text-muted-foreground/70">
            <span>All files</span>
            <span>∙</span>
            <span>Max {maxFiles} files</span>
            <span>∙</span>
            <span>Up to {formatBytes(maxSize)}</span>
          </div>
        </div>
      </div>

      {errors.length > 0 && (
        <div
          className="flex items-center gap-1 text-xs text-destructive"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between gap-2 rounded-lg border bg-background p-2 pe-3"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded border">
                  {getFileIcon(file)}
                </div>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <p className="truncate text-[13px] font-medium">
                    {file.file instanceof File
                      ? file.file.name
                      : file.file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatBytes(
                      file.file instanceof File
                        ? file.file.size
                        : file.file.size,
                    )}
                  </p>
                </div>
              </div>

              <Button
                size="icon"
                variant="ghost"
                className="-me-2 size-8 text-muted-foreground/80 hover:bg-transparent hover:text-foreground"
                onClick={() => removeFile(file.id)}
                aria-label="Remove file"
              >
                <XIcon className="size-4" aria-hidden="true" />
              </Button>
            </div>
          ))}

          {/* Action buttons */}
          <div className="flex gap-2">
            {files.length > 1 && (
              <Button size="sm" variant="outline" onClick={clearFiles}>
                Supprimer tous les fichiers
              </Button>
            )}

            {pdfFiles.length > 0 && (
              <Button
                size="sm"
                variant="default"
                onClick={() => setIsDialogOpen(true)}
                className="gap-2"
              >
                <SendIcon className="size-4" />
                Envoyer les PDFs ({pdfFiles.length})
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Dialog de sélection des utilisateurs */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Envoyer les PDFs par email</DialogTitle>
            <DialogDescription>
              Sélectionnez les utilisateurs qui recevront les {pdfFiles.length}{" "}
              fichier(s) PDF
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Select all checkbox */}
            <div className="flex items-center space-x-2 border-b pb-3">
              <Checkbox
                id="select-all"
                checked={selectedUsers.length === dummyUsers.length}
                onCheckedChange={handleSelectAll}
              />
              <Label
                htmlFor="select-all"
                className="text-sm font-medium cursor-pointer"
              >
                Sélectionner tout ({dummyUsers.length} utilisateurs)
              </Label>
            </div>

            {/* User list */}
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-3">
                {dummyUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-start space-x-3 rounded-lg border p-3 hover:bg-accent/50 transition-colors"
                  >
                    <Checkbox
                      id={`user-${user.id}`}
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={() => handleUserToggle(user.id)}
                    />
                    <div className="flex-1 space-y-1">
                      <Label
                        htmlFor={`user-${user.id}`}
                        className="text-sm font-medium cursor-pointer"
                      >
                        {user.name}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                    {selectedUsers.includes(user.id) && (
                      <CheckIcon className="size-4 text-primary" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)} disabled={isSending}>
              Annuler
            </Button>
            <Button
              onClick={handleSendFiles}
              disabled={selectedUsers.length === 0 || isSending}
              className="gap-2"
            >
              {isSending ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <SendIcon className="size-4" />
                  Envoyer à {selectedUsers.length} utilisateur
                  {selectedUsers.length > 1 ? "s" : ""}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <p
        aria-live="polite"
        role="region"
        className="mt-2 text-center text-xs text-muted-foreground"
      >
        Upload et envoi de PDFs par email
      </p>
    </div>
  );
}
