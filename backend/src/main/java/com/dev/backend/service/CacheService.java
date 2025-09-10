package com.dev.backend.service;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

@Service
public class CacheService {
    
    private final Map<String, CacheEntry> cache = new ConcurrentHashMap<>();
    
    @Cacheable(value = "dashboardStats", key = "'dashboard'")
    public String getCachedDashboardStats() {
        // This would be used with Spring Cache annotations
        return "cached_dashboard_stats";
    }
    
    public void put(String key, Object value, long ttlMinutes) {
        cache.put(key, new CacheEntry(value, LocalDateTime.now().plusMinutes(ttlMinutes)));
    }
    
    public Object get(String key) {
        CacheEntry entry = cache.get(key);
        if (entry != null && entry.isExpired()) {
            cache.remove(key);
            return null;
        }
        return entry != null ? entry.getValue() : null;
    }
    
    public void evict(String key) {
        cache.remove(key);
    }
    
    public void clear() {
        cache.clear();
    }
    
    private static class CacheEntry {
        private final Object value;
        private final LocalDateTime expiryTime;
        
        public CacheEntry(Object value, LocalDateTime expiryTime) {
            this.value = value;
            this.expiryTime = expiryTime;
        }
        
        public Object getValue() {
            return value;
        }
        
        public boolean isExpired() {
            return LocalDateTime.now().isAfter(expiryTime);
        }
    }
}
