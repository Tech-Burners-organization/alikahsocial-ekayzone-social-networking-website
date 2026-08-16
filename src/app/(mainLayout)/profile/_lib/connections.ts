import { AllImages } from "../../../../../public/images/AllImages";

export interface Connection {
    id: string;
    name: string;
    handle: string;
    avatarUrl: string;
}

const PEOPLE = [
    { name: "Sarah Johnson", handle: "@imsara" },
    { name: "Michael Smith", handle: "@mike_smith" },
    { name: "Emily Davis", handle: "@emilyd" },
    { name: "David Lee", handle: "@davidlee" },
    { name: "Jessica Brown", handle: "@jessicab" },
    { name: "Daniel Wilson", handle: "@danwilson" },
    { name: "Laura Garcia", handle: "@laurag" },
    { name: "Chris Martinez", handle: "@chrismart" },
    { name: "Sophia Taylor", handle: "@sophiat" },
];

function buildConnections(idPrefix: string): Connection[] {
    return PEOPLE.map((person, index) => ({
        id: `${idPrefix}-${index + 1}`,
        ...person,
        avatarUrl: AllImages.profile.src,
    }));
}

function filterConnections(list: Connection[], search: string): Connection[] {
    const query = search.trim().toLowerCase();
    if (!query) return list;
    return list.filter(
        (connection) =>
            connection.name.toLowerCase().includes(query) || connection.handle.toLowerCase().includes(query)
    );
}

export function getFollowers(search: string): Connection[] {
    return filterConnections(buildConnections("follower"), search);
}

export function getFollowing(search: string): Connection[] {
    return filterConnections(buildConnections("following"), search);
}
