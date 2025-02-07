
"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CalendarButton } from "@/components/widgets/calendarButton"

// Sample data for Call Recordings
const callRecordingsData: CallRecording[] = [
  {
    id: "1",
    date: "2023-10-01",
    invoice: "INV001",
    status: "Booked",
    duration: "0:18",
    recordingUrl: "https://actions.google.com/sounds/v1/cartoon/rainstick_slow.ogg",
  },
  {
    id: "2",
    date: "2023-10-02",
    invoice: "INV002",
    status: "Cancelled",
    duration: "0:50",
    recordingUrl: "https://actions.google.com/sounds/v1/ambiences/barnyard_with_animals.ogg",
  },
  {
    id: "3",
    date: "2023-10-03",
    invoice: "INV003",
    status: "Question",
    duration: "7:48",
    recordingUrl: "https://example.com/recording3.mp3",
  },
  {
    id: "4",
    date: "2023-10-04",
    invoice: "INV004",
    status: "Transferred",
    duration: "4:56",
    recordingUrl: "https://example.com/recording4.mp3",
  },
  {
    id: "5",
    date: "2023-10-05",
    invoice: "INV005",
    status: "Rescheduled",
    duration: "6:12",
    recordingUrl: "https://example.com/recording5.mp3",
  },
]


export type CallRecording = {
  id: string
  date: string
  invoice: string
  status: "Booked" | "Cancelled" | "Question" | "Transferred" | "Rescheduled" | "Other"
  duration: string
  recordingUrl: string
}

export const columns: ColumnDef<CallRecording>[] = [
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
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "invoice",
    header: "Invoice",
    cell: ({ row }) => <div>{row.getValue("invoice")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => <div>{row.getValue("duration")}</div>,
  },
  {
    accessorKey: "recording",
    header: "Recording",
    cell: ({ row }) => {
      const recordingUrl = row.original.recordingUrl
      const [isPlaying, setIsPlaying] = React.useState(false)
      const [progress, setProgress] = React.useState(0)
      const audioRef = React.useRef<HTMLAudioElement>(null)

      const handlePlay = () => {
        if (audioRef.current) {
          if (isPlaying) {
            audioRef.current.pause()
          } else {
            audioRef.current.play()
          }
          setIsPlaying(!isPlaying)
        }
      }

      const handleTimeUpdate = () => {
        if (audioRef.current) {
          const currentTime = audioRef.current.currentTime
          const duration = audioRef.current.duration
          const progressValue = (currentTime / duration) * 100
          setProgress(progressValue)
        }
      }

      return (
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePlay}
            >
              {isPlaying ? "Pause" : "Play"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // Placeholder for download functionality
                console.log("Download recording:", recordingUrl)
              }}
            >
              Download
            </Button>
          </div>
          <Progress value={progress} className="w-full" />
          <audio
            ref={audioRef}
            src={recordingUrl}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => {
              setIsPlaying(false)
              setProgress(0)
            }}
          />
        </div>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const recording = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(recording.id)}
            >
              Copy recording ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: callRecordingsData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  // Function to handle downloading selected invoices
  const handleDownloadSelected = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows
    const selectedInvoices = selectedRows.map((row) => row.original.invoice)
    console.log("Downloading selected invoices:", selectedInvoices)
  }

  return (
    <div className="w-full px-5">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter invoices..."
          value={(table.getColumn("invoice")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("invoice")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {/* Dropdown to filter by status */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-2">
              Filter by Status <ChevronDown className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {["Booked", "Cancelled", "Question", "Transferred", "Rescheduled", "Other"].map(
              (status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={table.getColumn("status")?.getFilterValue() === status}
                  onCheckedChange={(value) =>
                    table.getColumn("status")?.setFilterValue(value ? status : undefined)
                  }
                >
                  {status}
                </DropdownMenuCheckboxItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
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
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>

        <CalendarButton />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
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
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadSelected}
            disabled={table.getFilteredSelectedRowModel().rows.length === 0}
          >
            Download selected invoices
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}