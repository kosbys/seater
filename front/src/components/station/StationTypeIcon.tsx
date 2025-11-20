import type { StationType } from "@/types/types";

function StationTypeIcon({ type }: { type: StationType }) {
    switch (type) {
        case "computer":
            return (
                <span className="self-center">
                    <svg
                        className="size-8"
                        xmlns="http://www.w3.org/2000/svg"
                        width={48}
                        height={48}
                        viewBox="0 0 256 256"
                    >
                        <title>Computer</title>
                        <path
                            fill="currentColor"
                            d="M88 72a8 8 0 0 1 8-8h64a8 8 0 0 1 0 16H96a8 8 0 0 1-8-8m8 40h64a8 8 0 0 0 0-16H96a8 8 0 0 0 0 16m112-72v176a16 16 0 0 1-16 16H64a16 16 0 0 1-16-16V40a16 16 0 0 1 16-16h128a16 16 0 0 1 16 16m-16 0H64v176h128Zm-64 128a12 12 0 1 0 12 12a12 12 0 0 0-12-12"
                        ></path>
                    </svg>
                </span>
            );
        case "laptop":
            return (
                <span className="self-center">
                    <svg
                        className="size-8"
                        xmlns="http://www.w3.org/2000/svg"
                        width={32}
                        height={32}
                        viewBox="0 0 24 24"
                    >
                        <title>Laptop</title>
                        <path
                            fill="currentColor"
                            d="m23.3 20.69l-2.11-6.83a1.34 1.34 0 0 0-.34-.56a2.62 2.62 0 0 0 .65-1.72V2.92A2.68 2.68 0 0 0 18.83.25H5.16A2.67 2.67 0 0 0 2.5 2.92v8.66a2.66 2.66 0 0 0 .64 1.72a1.46 1.46 0 0 0-.34.56L.73 20.61a2.17 2.17 0 0 0 1.94 3.14h18.66a2.15 2.15 0 0 0 1.84-1a2.11 2.11 0 0 0 .13-2.06m-7.8.46a.49.49 0 0 1-.4.21H8.9a.51.51 0 0 1-.41-.21a.52.52 0 0 1-.07-.45L9 18.9a.5.5 0 0 1 .48-.35h5a.5.5 0 0 1 .47.35l.6 1.8a.49.49 0 0 1-.05.45M4.5 2.92a.67.67 0 0 1 .66-.67h13.67a.67.67 0 0 1 .67.67v8.66a.67.67 0 0 1-.67.67H5.16a.67.67 0 0 1-.66-.67Z"
                        ></path>
                    </svg>
                </span>
            );
        case "tablet":
            return (
                <span className="self-center">
                    <svg
                        className="size-8"
                        xmlns="http://www.w3.org/2000/svg"
                        width={32}
                        height={32}
                        viewBox="0 0 20 20"
                    >
                        <title>Tablet</title>
                        <path
                            fill="currentColor"
                            d="M16 0H4C2.9 0 2 .899 2 2v16c0 1.1.9 2 2 2h12c1.101 0 2-.9 2-2V2c0-1.101-.899-2-2-2m-6 19c-.69 0-1.25-.447-1.25-1s.56-1 1.25-1c.689 0 1.25.447 1.25 1s-.561 1-1.25 1m6-3H4V2h12z"
                        ></path>
                    </svg>
                </span>
            );
        case "monitor":
            return (
                <span className="self-center">
                    <svg
                        className="size-8"
                        xmlns="http://www.w3.org/2000/svg"
                        width={32}
                        height={32}
                        viewBox="0 0 24 24"
                    >
                        <title>Monitor</title>
                        <path
                            fill="currentColor"
                            d="M21 16H3V4h18m0-2H3c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h7v2H8v2h8v-2h-2v-2h7a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2"
                        ></path>
                    </svg>
                </span>
            );
        default:
            return null;
    }
}

export { StationTypeIcon };
