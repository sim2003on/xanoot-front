import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Metadata } from "next";
import { Settings } from "./Settings";

export const metadata: Metadata = {
    title: 'Settings',
    ...NO_INDEX_PAGE
}

export default function SettingsPage() {
    return <Settings />
}