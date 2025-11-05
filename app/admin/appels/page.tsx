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
  ChevronDownIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleAlertIcon,
  CircleXIcon,
  Columns3Icon,
  EllipsisIcon,
  FilterIcon,
  ListFilterIcon,
  PlusIcon,
  TrashIcon,
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
    header: "Téléphone",
    accessorKey: "phone",
    size: 160,
  },
  {
    header: "Entreprise",
    accessorKey: "enterprise",
    size: 200,
  },
  {
    header: "Note",
    accessorKey: "note",
    cell: ({ row }) => {
      const note = row.getValue("note") as string;
      const truncatedNote =
        note.length > 50 ? note.substring(0, 50) + "..." : note;

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-help truncate max-w-[200px]">
                {truncatedNote}
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-md p-4">
              <p className="whitespace-pre-wrap text-white">{note}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
    size: 200,
  },
  {
    header: "Rendez-vous pris",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          className={cn(
            status === "Oui" && "bg-primary text-white",
            status === "Non" && "bg-background text-white",
            status === "En attente" && "bg-border text-white",
          )}
        >
          {status}
        </Badge>
      );
    },
    size: 140,
    filterFn: statusFilterFn,
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

  // Get unique status values
  const uniqueStatusValues = useMemo(() => {
    const statusColumn = table.getColumn("status");

    if (!statusColumn) return [];

    const values = Array.from(statusColumn.getFacetedUniqueValues().keys());

    return values.sort();
  }, [table.getColumn("status")?.getFacetedUniqueValues()]);

  // Get counts for each status
  const statusCounts = useMemo(() => {
    const statusColumn = table.getColumn("status");
    if (!statusColumn) return new Map();
    return statusColumn.getFacetedUniqueValues();
  }, [table.getColumn("status")?.getFacetedUniqueValues()]);

  const selectedStatuses = useMemo(() => {
    const filterValue = table.getColumn("status")?.getFilterValue() as string[];
    return filterValue ?? [];
  }, [table.getColumn("status")?.getFilterValue()]);

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
          {/* Filter by status */}
          <Popover>
            <PopoverTrigger asChild>
              <Button>
                <FilterIcon
                  className="-ms-1 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                Status
                {selectedStatuses.length > 0 && (
                  <span className="-me-1 inline-flex h-5 max-h-full items-center rounded border bg-secondary px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
                    {selectedStatuses.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto min-w-36 p-3" align="start">
              <div className="space-y-3">
                <div className="text-xs font-medium text-muted-foreground">
                  Filters
                </div>
                <div className="space-y-3">
                  {uniqueStatusValues.map((value, i) => (
                    <div key={value} className="flex items-center gap-2">
                      <Checkbox
                        id={`${id}-${i}`}
                        checked={selectedStatuses.includes(value)}
                        onCheckedChange={(checked: boolean) =>
                          handleStatusChange(checked, value)
                        }
                      />
                      <Label
                        htmlFor={`${id}-${i}`}
                        className="flex grow justify-between gap-2 font-normal"
                      >
                        {value}{" "}
                        <span className="ms-2 text-xs text-muted-foreground">
                          {statusCounts.get(value)}
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          {/* Toggle columns visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Columns3Icon
                  className="-ms-1 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Affichage des colonnes</DropdownMenuLabel>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                      onSelect={(event) => event.preventDefault()}
                    >
                      {column.columnDef.header}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-3">
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
                  Delete
                  <span className="-me-1 inline-flex h-5 max-h-full items-center rounded border bg-secondary px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
                    {table.getSelectedRowModel().rows.length}
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
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete{" "}
                      {table.getSelectedRowModel().rows.length} selected{" "}
                      {table.getSelectedRowModel().rows.length === 1
                        ? "row"
                        : "rows"}
                      .
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteRows}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          {/* Add call button */}
          <Button className="ml-auto" onClick={() => setIsAddDialogOpen(true)}>
            <PlusIcon
              className="-ms-1 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Ajouter un appel
          </Button>
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
            <Button variant="destructive" onClick={handleDeleteCall}>
              Supprimer
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
