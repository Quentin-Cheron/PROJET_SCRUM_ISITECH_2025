"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleAlertIcon,
  CircleXIcon,
  EllipsisIcon,
  FileArchiveIcon,
  FileIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  FileUpIcon,
  HeadphonesIcon,
  ImageIcon,
  ListFilterIcon,
  SendIcon,
  TrashIcon,
  VideoIcon,
  XIcon,
} from "lucide-react";
import { useId, useMemo, useRef, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { formatBytes, useFileUpload } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";

type Item = {
  id: string;
  name: string;
  email: string;
  phone: string;
  enterprise: string;
  note: string;
  status: "Oui" | "Non" | "En attente";
};

// Custom filter function for multi-column searching
const multiColumnFilterFn: FilterFn<Item> = (row, columnId, filterValue) => {
  const searchableRowContent =
    `${row.original.name} ${row.original.email}`.toLowerCase();
  const searchTerm = (filterValue ?? "").toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

const statusFilterFn: FilterFn<Item> = (
  row,
  columnId,
  filterValue: string[],
) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

const createColumns = (
  onEdit: (item: Item) => void,
  onDelete: (item: Item) => void,
): ColumnDef<Item>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    size: 28,
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
    size: 180,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: "Email",
    accessorKey: "email",
    size: 250,
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => (
      <RowActions
        row={row}
        onEdit={() => onEdit(row.original)}
        onDelete={() => onDelete(row.original)}
      />
    ),
    size: 60,
    enableHiding: false,
  },
];

export default function Component() {
  const id = useId();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "name",
      desc: false,
    },
  ]);

  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isSendPdfDialogOpen, setIsSendPdfDialogOpen] = useState(false);
  const [selectedUsersForPdf, setSelectedUsersForPdf] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);

  // Form states
  const [formData, setFormData] = useState<Omit<Item, "id">>({
    name: "",
    email: "",
    phone: "",
    enterprise: "",
    note: "",
    status: "Non",
  });

  // Fausses données d'appels
  const [data, setData] = useState<Item[]>([
    {
      id: "1",
      name: "Marie Dupont",
      email: "marie.dupont@email.com",
      phone: "+33 6 12 34 56 78",
      enterprise: "Tech Solutions SARL",
      note: "Intéressée par une consultation en visio. A mentionné des problèmes de stress au travail et des difficultés relationnelles. Souhaite un rendez-vous dans les 2 semaines.",
      status: "Oui",
    },
    {
      id: "2",
      name: "Pierre Martin",
      email: "pierre.martin@company.fr",
      phone: "+33 6 23 45 67 89",
      enterprise: "Indépendant",
      note: "Premier contact pour thérapie de couple. Préfère les consultations au cabinet. Disponible les lundis et mardis après 18h.",
      status: "Non",
    },
    {
      id: "3",
      name: "Sophie Bernard",
      email: "sophie.b@gmail.com",
      phone: "+33 7 34 56 78 90",
      enterprise: "Entreprise Générale du Bâtiment",
      note: "Demande d'information sur les tarifs et les types de thérapie proposés. Hésite entre coaching professionnel et thérapie personnelle.",
      status: "En attente",
    },
    {
      id: "4",
      name: "Lucas Dubois",
      email: "l.dubois@pro.com",
      phone: "+33 6 45 67 89 01",
      enterprise: "Finance Corp",
      note: "Recommandé par un ancien patient. Intéressé par une thérapie cognitivo-comportementale pour gestion de l'anxiété. Très motivé.",
      status: "Oui",
    },
    {
      id: "5",
      name: "Emma Rousseau",
      email: "emma.rousseau@mail.fr",
      phone: "+33 7 56 78 90 12",
      enterprise: "Startup Digital",
      note: "Burn-out récent, en arrêt maladie. Cherche un accompagnement pour reprendre le travail progressivement. Urgence modérée.",
      status: "Oui",
    },
    {
      id: "6",
      name: "Thomas Petit",
      email: "thomas.petit@email.com",
      phone: "+33 6 67 89 01 23",
      enterprise: "Sans emploi",
      note: "Première démarche thérapeutique. Timide au téléphone. A posé beaucoup de questions sur la confidentialité et le déroulement des séances.",
      status: "Non",
    },
    {
      id: "7",
      name: "Julie Moreau",
      email: "julie.m@hotmail.fr",
      phone: "+33 7 78 90 12 34",
      enterprise: "Hôpital Public",
      note: "Infirmière en service d'urgence. Épuisement professionnel. Demande des horaires flexibles et possibilité de visio pour compatibilité avec planning.",
      status: "En attente",
    },
    {
      id: "8",
      name: "Alexandre Simon",
      email: "a.simon@corporate.com",
      phone: "+33 6 89 01 23 45",
      enterprise: "Multinationale Tech",
      note: "Manager, problèmes de gestion du stress et des équipes. Souhaite des sessions orientées coaching en développement personnel et leadership.",
      status: "Oui",
    },
    {
      id: "9",
      name: "Camille Laurent",
      email: "camille.laurent@free.fr",
      phone: "+33 7 90 12 34 56",
      enterprise: "Enseignante",
      note: "Appel reçu après recommandation d'un collègue. Questionnements existentiels et besoin de faire le point sur sa vie personnelle et professionnelle.",
      status: "Non",
    },
    {
      id: "10",
      name: "Nicolas Bonnet",
      email: "nicolas.bonnet@gmail.com",
      phone: "+33 6 01 23 45 67",
      enterprise: "Consultant Freelance",
      note: "Deuxième appel - avait déjà contacté il y a 6 mois mais n'avait pas donné suite. Semble plus décidé maintenant. Troubles du sommeil et anxiété.",
      status: "En attente",
    },
    {
      id: "11",
      name: "Léa Fontaine",
      email: "lea.fontaine@outlook.fr",
      phone: "+33 7 12 34 56 78",
      enterprise: "Agence Communication",
      note: "Jeune active, 28 ans. Difficultés relationnelles au travail. A déjà fait une thérapie il y a 3 ans. Très à l'aise à l'oral.",
      status: "Oui",
    },
    {
      id: "12",
      name: "Julien Mercier",
      email: "j.mercier@email.com",
      phone: "+33 6 23 45 67 90",
      enterprise: "Industrie Automobile",
      note: "Appel très court. N'a pas souhaité donner beaucoup de détails. Demande juste de rappeler pour convenir d'un premier rendez-vous.",
      status: "Non",
    },
    {
      id: "13",
      name: "Chloé Garnier",
      email: "chloe.garnier@yahoo.fr",
      phone: "+33 7 34 56 78 01",
      enterprise: "Artiste Indépendante",
      note: "Créative en questionnement sur son orientation professionnelle. Souhaite travailler sur la confiance en soi et l'affirmation de soi.",
      status: "Oui",
    },
    {
      id: "14",
      name: "Maxime Lefebvre",
      email: "maxime.l@company.fr",
      phone: "+33 6 45 67 89 12",
      enterprise: "Cabinet d'Avocat",
      note: "Avocat débordé. Demande explicite d'aide pour gérer charge de travail et équilibre vie pro/perso. Disponible seulement en soirée.",
      status: "En attente",
    },
    {
      id: "15",
      name: "Sarah Morel",
      email: "sarah.morel@mail.com",
      phone: "+33 7 56 78 90 23",
      enterprise: "Restauration",
      note: "Gérante de restaurant. Stress post-COVID, difficultés financières de l'établissement impactant sa santé mentale. Besoin urgent d'accompagnement.",
      status: "Oui",
    },
  ]);

  const handleDeleteRows = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const updatedData = data.filter(
      (item) => !selectedRows.some((row) => row.original.id === item.id),
    );
    setData(updatedData);
    table.resetRowSelection();
  };

  // File upload hook
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
  });

  // Tous les fichiers sont acceptés
  const allFiles = files;

  const getFileIcon = (file: {
    file: File | { type: string; name: string };
  }) => {
    const fileType =
      file.file instanceof File ? file.file.type : file.file.type;
    const fileName =
      file.file instanceof File ? file.file.name : file.file.name;

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

  const handleUserToggle = (userId: string) => {
    setSelectedUsersForPdf((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  const handleSelectAllUsers = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const allUserIds = selectedRows.map((row) => row.original.id);

    if (selectedUsersForPdf.length === allUserIds.length) {
      setSelectedUsersForPdf([]);
    } else {
      setSelectedUsersForPdf(allUserIds);
    }
  };

  const handleSendPdfs = async () => {
    if (allFiles.length === 0) {
      alert("Aucun fichier à envoyer");
      return;
    }

    if (selectedUsersForPdf.length === 0) {
      alert("Veuillez sélectionner au moins un utilisateur");
      return;
    }

    setIsSending(true);

    try {
      // Récupérer les emails des utilisateurs sélectionnés
      const selectedEmails = data
        .filter((user) => selectedUsersForPdf.includes(user.id))
        .map((user) => user.email);

      // Préparer les données pour l'API
      const formData = new FormData();

      // Ajouter tous les fichiers
      allFiles.forEach((fileObj) => {
        if (fileObj.file instanceof File) {
          formData.append("files", fileObj.file);
        }
      });

      // Ajouter les emails
      formData.append("emails", JSON.stringify(selectedEmails));

      // Envoyer à l'API
      const response = await fetch("/api/send-files", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'envoi");
      }

      alert(
        result.message ||
          `Fichiers envoyés avec succès à ${selectedUsersForPdf.length} utilisateur(s):\n${selectedEmails.join("\n")}`,
      );

      // Réinitialiser la sélection et fermer le dialog
      setSelectedUsersForPdf([]);
      setIsSendPdfDialogOpen(false);
      clearFiles();
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Erreur lors de l'envoi des fichiers",
      );
    } finally {
      setIsSending(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      enterprise: "",
      note: "",
      status: "Non",
    });
    setSelectedItem(null);
  };

  // Add call
  const handleAddCall = () => {
    const newCall: Item = {
      id: (data.length + 1).toString(),
      ...formData,
    };
    setData([...data, newCall]);
    setIsAddDialogOpen(false);
    resetForm();
  };

  // Open edit dialog
  const handleEditClick = (item: Item) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      email: item.email,
      phone: item.phone,
      enterprise: item.enterprise,
      note: item.note,
      status: item.status,
    });
    setIsEditDialogOpen(true);
  };

  // Update call
  const handleUpdateCall = () => {
    if (!selectedItem) return;
    const updatedData = data.map((item) =>
      item.id === selectedItem.id ? { ...item, ...formData } : item,
    );
    setData(updatedData);
    setIsEditDialogOpen(false);
    resetForm();
  };

  // Open delete dialog
  const handleDeleteClick = (item: Item) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };

  // Delete call
  const handleDeleteCall = () => {
    if (!selectedItem) return;
    const updatedData = data.filter((item) => item.id !== selectedItem.id);
    setData(updatedData);
    setIsDeleteDialogOpen(false);
    resetForm();
  };

  const columns = useMemo(
    () => createColumns(handleEditClick, handleDeleteClick),
    [],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
    },
  });

  const handleStatusChange = (checked: boolean, value: string) => {
    const filterValue = table.getColumn("status")?.getFilterValue() as string[];
    const newFilterValue = filterValue ? [...filterValue] : [];

    if (checked) {
      newFilterValue.push(value);
    } else {
      const index = newFilterValue.indexOf(value);
      if (index > -1) {
        newFilterValue.splice(index, 1);
      }
    }

    table
      .getColumn("status")
      ?.setFilterValue(newFilterValue.length ? newFilterValue : undefined);
  };

  return (
    <div className="space-y-4 bg-secondary p-5">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Filter by name or email */}
          <div className="relative">
            <Input
              id={`${id}-input`}
              ref={inputRef}
              className={cn(
                "peer min-w-60 ps-9",
                Boolean(table.getColumn("name")?.getFilterValue()) && "pe-9",
              )}
              value={
                (table.getColumn("name")?.getFilterValue() ?? "") as string
              }
              onChange={(e) =>
                table.getColumn("name")?.setFilterValue(e.target.value)
              }
              placeholder="Rechercher par nom ou email..."
              type="text"
              aria-label="Filtrer par nom ou email"
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
              <ListFilterIcon size={16} aria-hidden="true" />
            </div>
            {Boolean(table.getColumn("name")?.getFilterValue()) && (
              <button
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Clear filter"
                onClick={() => {
                  table.getColumn("name")?.setFilterValue("");
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }}
              >
                <CircleXIcon size={16} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Send PDF button - appears when users are selected */}
          {table.getSelectedRowModel().rows.length > 0 && (
            <Button
              variant="default"
              onClick={() => {
                const selectedRows = table.getSelectedRowModel().rows;
                setSelectedUsersForPdf(
                  selectedRows.map((row) => row.original.id),
                );
                setIsSendPdfDialogOpen(true);
              }}
              className="gap-2"
            >
              <SendIcon
                className="-ms-1 opacity-60"
                size={16}
                aria-hidden="true"
              />
              Envoyer fichiers
              <span className="-me-1 inline-flex h-5 max-h-full items-center border rounded px-1 font-[inherit] text-xs font-medium text-muted-foreground/70">
                {table.getSelectedRowModel().rows.length}{" "}
                {table.getSelectedRowModel().rows.length === 1
                  ? "utilisateur"
                  : "utilisateurs"}
              </span>
            </Button>
          )}

          {/* Delete button */}
          {table.getSelectedRowModel().rows.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="ml-auto">
                  <TrashIcon
                    className="-ms-1 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  Supprimer
                  <span className="-me-1 inline-flex h-5 max-h-full items-center border rounded px-1 font-[inherit] text-xs font-medium text-muted-foreground/70">
                    {table.getSelectedRowModel().rows.length}{" "}
                    {table.getSelectedRowModel().rows.length === 1
                      ? "ligne"
                      : "lignes"}
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                  <div
                    className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                    aria-hidden="true"
                  >
                    <CircleAlertIcon className="opacity-80" size={16} />
                  </div>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Êtes-vous sûr de vouloir supprimer les lignes
                      sélectionnées ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action est irréversible. Vous avez{" "}
                      {table.getSelectedRowModel().rows.length} sélectionnées{" "}
                      {table.getSelectedRowModel().rows.length === 1
                        ? "ligne"
                        : "lignes"}
                      .
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteRows}>
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          {/* Add call button */}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-md border bg-secondary">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                      className="h-11"
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <div
                          className={cn(
                            header.column.getCanSort() &&
                              "flex h-full cursor-pointer items-center justify-between gap-2 select-none",
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            // Enhanced keyboard handling for sorting
                            if (
                              header.column.getCanSort() &&
                              (e.key === "Enter" || e.key === " ")
                            ) {
                              e.preventDefault();
                              header.column.getToggleSortingHandler()?.(e);
                            }
                          }}
                          tabIndex={header.column.getCanSort() ? 0 : undefined}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: (
                              <ChevronUpIcon
                                className="shrink-0 opacity-60"
                                size={16}
                                aria-hidden="true"
                              />
                            ),
                            desc: (
                              <ChevronDownIcon
                                className="shrink-0 opacity-60"
                                size={16}
                                aria-hidden="true"
                              />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="last:py-0">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-8">
        {/* Results per page */}
        <div className="flex items-center gap-3">
          <Label htmlFor={id} className="max-sm:sr-only">
            Lignes par page
          </Label>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger id={id} className="w-fit whitespace-nowrap">
              <SelectValue placeholder="Select number of results" />
            </SelectTrigger>
            <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
              {[20, 30, 50, 75].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Page number information */}
        <div className="flex grow justify-end text-sm whitespace-nowrap text-muted-foreground">
          <p
            className="text-sm whitespace-nowrap text-muted-foreground"
            aria-live="polite"
          >
            <span className="text-foreground">
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
              -
              {Math.min(
                Math.max(
                  table.getState().pagination.pageIndex *
                    table.getState().pagination.pageSize +
                    table.getState().pagination.pageSize,
                  0,
                ),
                table.getRowCount(),
              )}
            </span>{" "}
            of{" "}
            <span className="text-foreground">
              {table.getRowCount().toString()}
            </span>
          </p>
        </div>

        {/* Pagination buttons */}
        <div>
          <Pagination>
            <PaginationContent>
              {/* First page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.firstPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to first page"
                >
                  <ChevronFirstIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Previous page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to previous page"
                >
                  <ChevronLeftIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Next page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to next page"
                >
                  <ChevronRightIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Last page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.lastPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to last page"
                >
                  <ChevronLastIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* Add Call Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Ajouter un appel</DialogTitle>
            <DialogDescription>
              Remplissez les informations de l&apos;appel reçu
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="add-name">Nom complet *</Label>
                <Input
                  id="add-name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Marie Dupont"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-email">Email *</Label>
                <Input
                  id="add-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="marie.dupont@email.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="add-phone">Téléphone *</Label>
                <Input
                  id="add-phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+33 6 12 34 56 78"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-enterprise">Entreprise</Label>
                <Input
                  id="add-enterprise"
                  value={formData.enterprise}
                  onChange={(e) =>
                    setFormData({ ...formData, enterprise: e.target.value })
                  }
                  placeholder="Nom de l'entreprise"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-status">Rendez-vous pris</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "Oui" | "Non" | "En attente") =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger id="add-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Oui">Oui</SelectItem>
                  <SelectItem value="Non">Non</SelectItem>
                  <SelectItem value="En attente">En attente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-note">Note</Label>
              <Textarea
                id="add-note"
                value={formData.note}
                onChange={(e) =>
                  setFormData({ ...formData, note: e.target.value })
                }
                placeholder="Détails de l'appel, demandes spécifiques, disponibilités..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setIsAddDialogOpen(false);
                resetForm();
              }}
            >
              Annuler
            </Button>
            <Button onClick={handleAddCall}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Call Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier l&apos;appel</DialogTitle>
            <DialogDescription>
              Modifiez les informations de l&apos;appel
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nom complet *</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Marie Dupont"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email *</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="marie.dupont@email.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Téléphone *</Label>
                <Input
                  id="edit-phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+33 6 12 34 56 78"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-enterprise">Entreprise</Label>
                <Input
                  id="edit-enterprise"
                  value={formData.enterprise}
                  onChange={(e) =>
                    setFormData({ ...formData, enterprise: e.target.value })
                  }
                  placeholder="Nom de l'entreprise"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Rendez-vous pris</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "Oui" | "Non" | "En attente") =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger id="edit-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Oui">Oui</SelectItem>
                  <SelectItem value="Non">Non</SelectItem>
                  <SelectItem value="En attente">En attente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-note">Note</Label>
              <Textarea
                id="edit-note"
                value={formData.note}
                onChange={(e) =>
                  setFormData({ ...formData, note: e.target.value })
                }
                placeholder="Détails de l'appel, demandes spécifiques, disponibilités..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setIsEditDialogOpen(false);
                resetForm();
              }}
            >
              Annuler
            </Button>
            <Button onClick={handleUpdateCall}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Call Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer cet appel ?</DialogTitle>
            <DialogDescription>
              Cette action est irréversible. L&apos;appel de{" "}
              <span className="font-semibold">{selectedItem?.name}</span> sera
              définitivement supprimé.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                setIsDeleteDialogOpen(false);
                resetForm();
              }}
            >
              Annuler
            </Button>
            <Button onClick={handleDeleteCall}>Supprimer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send PDF Dialog */}
      <Dialog open={isSendPdfDialogOpen} onOpenChange={setIsSendPdfDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Envoyer des fichiers par email</DialogTitle>
            <DialogDescription>
              Uploadez des fichiers et sélectionnez les utilisateurs qui les
              recevront
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* File Upload Section */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">
                Fichiers à envoyer
              </Label>

              {/* Drop area */}
              <div
                role="button"
                onClick={openFileDialog}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                data-dragging={isDragging || undefined}
                className="flex min-h-32 flex-col items-center justify-center rounded-xl border border-dashed border-input p-4 transition-colors hover:bg-accent/50 cursor-pointer data-[dragging=true]:bg-accent/50"
              >
                <input
                  {...getInputProps()}
                  className="sr-only"
                  aria-label="Upload files"
                />

                <div className="flex flex-col items-center justify-center text-center">
                  <div
                    className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-secondary"
                    aria-hidden="true"
                  >
                    <FileUpIcon className="size-4 opacity-60" />
                  </div>
                  <p className="mb-1.5 text-sm font-medium">
                    Télécharger des fichiers
                  </p>
                  <p className="mb-2 text-xs text-muted-foreground">
                    Glissez-déposez ou cliquez pour parcourir
                  </p>
                  <div className="flex flex-wrap justify-center gap-1 text-xs text-muted-foreground/70">
                    <span>∙</span>
                    <span>Max {maxFiles} fichiers</span>
                    <span>∙</span>
                    <span>Jusqu&apos;à {formatBytes(maxSize)}</span>
                  </div>
                </div>
              </div>

              {errors.length > 0 && (
                <div
                  className="flex items-center gap-1 text-xs text-destructive"
                  role="alert"
                >
                  <CircleAlertIcon className="size-3 shrink-0" />
                  <span>{errors[0]}</span>
                </div>
              )}

              {/* File list */}
              {files.length > 0 && (
                <div className="space-y-2 mt-3">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between gap-2 rounded-lg border bg-secondary p-2 pe-3"
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

                  {files.length > 1 && (
                    <Button size="sm" onClick={clearFiles}>
                      Supprimer tous les fichiers
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Users Selection Section */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                Destinataires ({selectedUsersForPdf.length} sélectionné
                {selectedUsersForPdf.length > 1 ? "s" : ""})
              </Label>

              {/* Select all checkbox */}
              <div className="flex items-center space-x-2 border-b pb-3">
                <Checkbox
                  id="select-all-users"
                  checked={
                    selectedUsersForPdf.length ===
                      table.getSelectedRowModel().rows.length &&
                    table.getSelectedRowModel().rows.length > 0
                  }
                  onCheckedChange={handleSelectAllUsers}
                />
                <Label
                  htmlFor="select-all-users"
                  className="text-sm font-medium cursor-pointer"
                >
                  Sélectionner tous les utilisateurs (
                  {table.getSelectedRowModel().rows.length})
                </Label>
              </div>

              {/* User list */}
              <ScrollArea className="h-[200px] pr-4">
                <div className="space-y-3">
                  {table.getSelectedRowModel().rows.map((row) => {
                    const user = row.original;
                    return (
                      <div
                        key={user.id}
                        className="flex items-start space-x-3 rounded-lg border p-3 hover:bg-accent/50 transition-colors"
                      >
                        <Checkbox
                          id={`user-pdf-${user.id}`}
                          checked={selectedUsersForPdf.includes(user.id)}
                          onCheckedChange={() => handleUserToggle(user.id)}
                        />
                        <div className="flex-1 space-y-1">
                          <Label
                            htmlFor={`user-pdf-${user.id}`}
                            className="text-sm font-medium cursor-pointer"
                          >
                            {user.name}
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                        {selectedUsersForPdf.includes(user.id) && (
                          <CheckIcon className="size-4 text-primary" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={() => {
                setIsSendPdfDialogOpen(false);
                setSelectedUsersForPdf([]);
              }}
              disabled={isSending}
            >
              Annuler
            </Button>
            <Button
              onClick={handleSendPdfs}
              disabled={
                allFiles.length === 0 ||
                selectedUsersForPdf.length === 0 ||
                isSending
              }
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
                  Envoyer {allFiles.length} fichier
                  {allFiles.length > 1 ? "s" : ""} à{" "}
                  {selectedUsersForPdf.length} utilisateur
                  {selectedUsersForPdf.length > 1 ? "s" : ""}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function RowActions({
  row,
  onEdit,
  onDelete,
}: {
  row: Row<Item>;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-end">
          <Button
            size="icon"
            variant="ghost"
            className="shadow-none"
            aria-label="Actions"
          >
            <EllipsisIcon size={16} aria-hidden="true" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onEdit}>
            <span className="text-black cursor-pointer">Modifier</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onDelete}
          className="text-destructive focus:text-destructive cursor-pointer"
        >
          <span>Supprimer</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
