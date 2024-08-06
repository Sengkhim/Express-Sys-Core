
export type EndpointSourceDescriptor = {

    name: string | Function;

    path: string;
};

export default interface IEndpointMetaData {

    add(endpointSource: EndpointSourceDescriptor) : void;

    values() : EndpointSourceDescriptor[];

}