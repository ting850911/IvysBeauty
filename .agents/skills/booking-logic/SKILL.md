---
name: booking-logic
description: "Core algorithms for appointment availability and overlap checking."
---

# Booking Logic Skill

This skill defines the business logic for calculating available slots and preventing double bookings.

## Available Slots Algorithm
1. **Inputs**: `locationId`, `serviceId`, `date`.
2. **Exclusion Criteria**:
    - Filter out slots that overlap with `BookingStatus.CONFIRMED`.
    - Filter out slots that overlap with `BookingStatus.PENDING` where `expiredAt` > `now`.
3. **Buffer Management**: Ensure there is enough time for the service `duration` between existing bookings.
4. **Operating Hours**: Check against `Location.openingHours` and `Location.vacationDays`.

## Status Transitions
- `PENDING`: Initial state after customer booking.
- `CONFIRMED`: Set by owner after verifying `paymentProof`.
- `CANCELLED`: Set by user or owner.
- `DONE`: Completed service.
- `MISSED`: No-show.

## Automation
- **Cleanup**: A background task should run every 10 minutes to release `PENDING` bookings that have passed their `expiredAt` without being confirmed.
