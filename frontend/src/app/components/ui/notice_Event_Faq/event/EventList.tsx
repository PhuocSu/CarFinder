"use client"

import { useEventQuery } from "@/app/api/event/useEventQuery";
import EventCard from "../../cards/EventCard";
import { useRecoilValue } from "recoil";
import { eventState } from "@/store/eventStore.atom";
import { Row, Col } from 'antd';

const EventList = () => {
    const eventData = useRecoilValue(eventState);
    const searchTerm = eventData.search;
    
    const { data } = useEventQuery(eventData.page, eventData.limit, searchTerm);
    return (
        <Row gutter={[20, 24]}>
            {data?.items.map((item) => (
                <Col span={6}>
                    <EventCard key={item.id} event={item} />
                </Col>
            ))}
        </Row>
    )
}

export default EventList