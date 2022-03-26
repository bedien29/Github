using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraScript : MonoBehaviour
{
    private Transform Player;
    private float minX = 3.45f,
        maxX = 204;
    private void Start()
    {
        Player = GameObject.FindWithTag("Player").transform;
    }
    private void Update()
    {
        if (Player != null)
        {
            Vector3 vitri = transform.position;
            vitri.x = Player.position.x;
            if (vitri.x < minX) vitri.x = 3.45f;
            if (vitri.x > maxX) vitri.x = maxX;
            transform.position = vitri;
        }
    }

}
