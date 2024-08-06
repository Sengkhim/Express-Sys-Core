import IEndpointMetaData, {EndpointSourceDescriptor} from "../interface/endpointMetaData";

export default class EndpointMetaData implements IEndpointMetaData {

   protected _endpoint: Set<EndpointSourceDescriptor> = new Set<EndpointSourceDescriptor>();
    add (endpointSource: EndpointSourceDescriptor): void {

        if(endpointSource === null) throw new Error("Endpoint source descriptor cannot be null");
        this._endpoint.add(endpointSource);
    }

    values (): EndpointSourceDescriptor[] {
        return this._endpoint.toArray();
    }
}