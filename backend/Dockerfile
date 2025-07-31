# --- 1. Build Stage (Only for copying the binary) ---
FROM alpine:3.18 as final

# Set working directory
WORKDIR /app

# Copy the pre-compiled binary from the host
COPY market-pulse-backend-linux .

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run the executable
CMD ["./market-pulse-backend-linux"] 