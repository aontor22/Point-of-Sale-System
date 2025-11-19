import React, { useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronUpCircle, Image } from "lucide-react";

export default function ImagesSection({ files, setFiles, onCollapse }) {
    const inputRef = useRef(null);

    const onPick = (e) => {
        const f = Array.from(e.target.files || []);
        if (f.length) setFiles([...(files || []), ...f]);
    };

    const removeAt = (idx) => {
        const next = [...files];
        next.splice(idx, 1);
        setFiles(next);
    };


    const [collapsed, setCollapsed] = React.useState(false);
        const toggle = () => {
        setCollapsed((v) => !v);
        onCollapse?.();
    };

    return (
        <Card className="border dark:bg-slate-800 rounded-md p-0">
            <div className="flex items-center border-b justify-between px-4 py-2">
                <p className="text-sm flex font-semibold text-green-700 items-center gap-1.5"> <Image size={16} /> Images</p>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 cursor-pointer"
                    onClick={toggle}
                >
                    <ChevronUpCircle
                        className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""
                            }`}
                    />
                </Button>
            </div>


            {!collapsed && (
                <CardContent className="space-y-3 pb-4">
                    <Label className="block text-sm">Add Image</Label>
                    <div
                        className="flex flex-col items-center justify-center gap-3 rounded-md border border-dashed p-6 text-center"
                        onClick={() => inputRef.current?.click()}
                        role="button"
                    >
                        <p className="text-sm text-muted-foreground">
                            Click to upload or drag & drop
                        </p>
                        <Button type="button" className="dark:bg-slate-700" variant="secondary" size="sm">
                            Choose Files
                        </Button>
                        <input
                            ref={inputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={onPick}
                        />
                    </div>

                    {files?.length ? (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                            {files.map((f, idx) => {
                                const url = URL.createObjectURL(f);
                                return (
                                    <div
                                        key={`${f.name}-${idx}`}
                                        className="relative overflow-hidden rounded-md border"
                                    >
                                        <img
                                            src={url}
                                            alt={f.name}
                                            className="h-32 w-full object-cover"
                                            onLoad={() => URL.revokeObjectURL(url)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeAt(idx)}
                                            className="absolute right-2 top-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    ) : null}
                </CardContent>
            )}
        </Card>
    );
}
