import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export interface Connection {
    name: string;
    icon: LucideIcon;
    description: string;
    connectLabel: string;
    connections: number;
    comingSoon?: boolean;
    /** Brand colour of the third party, used for the icon tile only. */
    color: string;
}

/**
 * Shared by the Messaging and Data Sources pages, which were previously two
 * copies of the same markup with different arrays.
 */
export function ConnectionCard({ connection }: { connection: Connection }) {
    const { name, icon: Icon, description, connectLabel, connections, comingSoon, color } =
        connection;

    return (
        <Card interactive={!comingSoon} className="flex flex-col">
            <CardContent className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                    <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-field"
                        style={{ backgroundColor: `${color}1a`, color }}
                    >
                        <Icon className="h-[22px] w-[22px]" aria-hidden="true" />
                    </span>
                    {comingSoon ? (
                        <Badge variant="warning" size="sm">
                            Coming soon
                        </Badge>
                    ) : connections > 0 ? (
                        <Badge variant="success" size="sm">
                            {connections} connected
                        </Badge>
                    ) : null}
                </div>

                <h3 className="mt-4 font-semibold text-foreground">{name}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-500">
                    {description}
                </p>

                <div className="mt-5 space-y-2">
                    <Button full disabled={comingSoon}>
                        {connectLabel}
                    </Button>
                    <Button full variant="outline" size="sm" disabled={connections === 0}>
                        Manage connections ({connections})
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
